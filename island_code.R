# open library
library(lmerTest)
library(dplyr)
library(ggplot2)
library(emmeans)

# open csv file
idtotal = read.csv('island.final.csv', colClasses = c(rep('factor',8), 'numeric'))


##########################
### calculate z-scores ###
##########################
# calculate and save number of participants and items
idNparticipants = length(levels(idtotal$participantID))
idNitems = nrow(idtotal)/idNparticipants

# calculate mean per participant
partmeandf = idtotal %>%
  group_by(participantID) %>%
  summarize(partmean = mean(judgment))

# make a numeric vector that contains the per participant mean
id.partmean=as.numeric(unlist(partmeandf[ ,2], F, F))
id.partmean=rep(id.partmean, each = idNitems)

# calculate standard deviation (sd) per participant
partsddf = idtotal %>%
  group_by(participantID) %>%
  summarize(partmean = sd(judgment))

# make a numeric vector that contains the per participant sd
id.partsd=as.numeric(unlist(partsddf[ ,2], F, F))
id.partsd=rep(id.partsd, each = idNitems)

# make a judgment vector that corresponds to id.partmean and id.partsd
id.judgment <- as.integer(as.character(unlist(idtotal$judgment, F, F)))

# make a zscores vector
zscores=(id.judgment-id.partmean)/id.partsd

# transform vector into dataframe
total.z <- data.frame(idtotal,zscores)

#save a copy of the new dataset for your records
write.csv(total.z, file="islandtotal.final.zscores.csv", row.names=F)

# remove needless items
rm(total.z, id.judgment, id.partmean, id.partsd, partmeandf, partsddf, zscores)

# re-read csv file with zscores
idtotal = read.csv('islandtotal.final.zscores.csv', colClasses = c(rep('factor',8), rep('numeric',2)))

# subset dataframe
id <- subset(idtotal, !is.na(idtotal$condition))


########################################
### check homogeneity of two samples ###
########################################
# current experiment collected samples over two separate sessions
# this is a test to check whether the two groups ("over",  and "non") have the same means
# a Welch t-test will be used

# divide dataframe into overlapping and non-overlapping
over = subset(id, id$overlap=="over")
non = subset(id, id$overlap=="non")

# Equal variance?
var.test(over$zscores, non$zscores)

# Do a t-test on the datapoints
# The samples are unbalanced; R will assume non-equal variety and
# perform a Welch t-test for two unbalanced, unequal variance samples
t.test(over$zscores, non$zscores)
cat(capture.output(t.test(over$zscores, non$zscores)), file='island_homo.txt', append=TRUE)

# Do a t-test for each condition
# First, subset each data file for t.test
nonnomnul = subset(non, (non$top == "Nominative")&(non$sfp == "Without SFP"))
nonnomsfp = subset(non, (non$top == "Nominative")&(non$sfp == "With SFP"))
nontopnul = subset(non, (non$top == "Topic")&(non$sfp == "Without SFP"))
nontopsfp = subset(non, (non$top == "Topic")&(non$sfp == "With SFP"))

overnomnul = subset(over, (non$top == "Nominative")&(non$sfp == "Without SFP"))
overnomsfp = subset(over, (non$top == "Nominative")&(non$sfp == "With SFP"))
overtopnul = subset(over, (non$top == "Topic")&(non$sfp == "Without SFP"))
overtopsfp = subset(over, (non$top == "Topic")&(non$sfp == "With SFP"))

# Perform t-tests
t.test(nonnomnul$zscores, overnomnul$zscores)
t.test(nonnomsfp$zscores, overnomsfp$zscores)
t.test(nontopnul$zscores, overtopnul$zscores)
t.test(nontopsfp$zscores, overtopsfp$zscores)

cat(capture.output(t.test(nonnomnul$zscores, overnomnul$zscores)), file='island_homo.txt', append=TRUE)
cat(capture.output(t.test(nonnomsfp$zscores, overnomsfp$zscores)), file='island_homo.txt', append=TRUE)
cat(capture.output(t.test(nontopnul$zscores, overtopnul$zscores)), file='island_homo.txt', append=TRUE)
cat(capture.output(t.test(nontopsfp$zscores, overtopsfp$zscores)), file='island_homo.txt', append=TRUE)

########################
### Build lmer model ###
########################

# check contrasts: contrasts change the significance of the main effect !!!
# (but the significance of the interaction stays the same)
# we want the "unmarked" levels ("Nominative" and "With SFP" to be zero)
# then the direction of the main effects
contrasts(id$sfp)
contrasts(id$top)

# if contrast are in the wrong direction, change them 
# (try using [1:2] instead of [2:1] if things don't work out)
#contrasts(id$sfp)=contr.treatment(2)[2:1]
#contrasts(id$top)=contr.treatment(2)[2:1]

# build lmer model
im <- lmer(zscores~sfp*top+(1|participantID)+(1|tokenSet/item)+(1|islandType/tokenSet), data=id, REML=TRUE)

# view summary, which gives a wald test?
summary(im)
# save summary output to txt file
cat(capture.output(summary(im)), file='imsummary.txt', append=TRUE)


##############################################################
### Calculate condition mean, std. dev, and standard error ###
##############################################################
# Build a dataframe that aggregates over islandType and top levels
# Gives mean, standard deviation and standard error per condition
idagg.islandType = id %>%
  group_by(islandType, top)%>%
  summarize(islandType.mean = mean(zscores), islandType.sd = sd(zscores), islandType.se = islandType.sd/sqrt(n()))

# same type of dataframe, but over sfp level instead of islandType
# basically collapses CNP and wh into "sfp", and collapses rel and bec into "nul"
idagg.condition = id %>%
  group_by(sfp, top)%>%
  summarize(condition.mean = mean(zscores), condition.sd = sd(zscores), condition.se = condition.sd/sqrt(n()))

  
##############################
### Build interaction plot ###
##############################
# we can build an interaction plot with idagg.condition
idplot = ggplot(idagg.condition, aes(x=sfp, y=condition.mean, group = top, linetype=top)) + 
  geom_line()+ 
  geom_point()+ 
  geom_errorbar(aes(ymin=condition.mean-condition.se, ymax=condition.mean+condition.se), width=.3)+ 
  ylab("mean z-score judgment")+ 
  xlab("dependency length")+ 
  theme(axis.title.x = element_text(vjust=-0.5)) + 
  theme(axis.title.y = element_text(vjust=.2))+ 
  scale_y_continuous(limits=c(-1.5,1.5)) + 
  theme(legend.position="bottom")

# View plot
idplot
# Save plot
ggsave('island.interactionplot.png', idplot, height=7, width=7)


#####################################
### Post-hoc (Planned) comparison ###
#####################################
# pairwise comparison among fixed/random effects with emmeans package
# Using Bonferroni p-value adjustment for multiple tests (addresses Type-1 error)
#emmeans(im, pairwise~sfp*top, adjust="Bonferroni")

# save results as text file
cat(capture.output(emmeans(im, pairwise~sfp*top, adjust="Bonferroni")), file='island_posthoc_percondition.txt', append=TRUE)

# build an lmer w/ islandType as fixed effects (for per-island posthoc test)
im.island <- lmer(zscores~islandType*top+(1|participantID)+(1|tokenSet/item), data=id, REML=TRUE)
#emmeans(im.island, pairwise~islandType*top, adjust="Bonferroni")

cat(capture.output(emmeans(im.island, pairwise~islandType*top, adjust="Bonferroni")), file='island_posthoc_perisland.txt', append=TRUE)
