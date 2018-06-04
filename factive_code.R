# open library
library(lmerTest)
library(dplyr)
library(ggplot2)
library(emmeans)

# open csv file
fdtotal = read.csv('factive.final.csv', colClasses = c(rep('factor',6), 'numeric'))


##########################
### calculate z-scores ###
##########################
# calculate and save number of participants and items
fdNparticipants = length(levels(fdtotal$participantID))
fdNitems = nrow(fdtotal)/fdNparticipants

# calculate mean per participant
partmean = fdtotal %>%
  group_by(participantID) %>%
  summarize(partmean = mean(judgment))

# make a numeric vector that contains the per participant mean
fd.partmean=as.numeric(unlist(partmean[ ,2], F, F))
fd.partmean=rep(fd.partmean, each = fdNitems)

# calculate standard deviation (sd) per participant
partsddf = fdtotal %>%
  group_by(participantID) %>%
  summarize(partmean = sd(judgment))

# make a numeric vector that contains the per participant sd
fd.partsd=as.numeric(unlist(partsddf[ ,2], F, F))
fd.partsd=rep(fd.partsd, each = fdNitems)

# make a judgment vector that corresponds to id.partmean and id.partsd
fd.judgment <- as.integer(as.character(unlist(fdtotal$judgment, F, F)))

# make a zscores vector
zscores=(fd.judgment-fd.partmean)/fd.partsd

# transform vector into dataframe
total.z <- data.frame(fdtotal,zscores)

#save a copy of the new dataset for your records
write.csv(total.z, file="factive.final.zscores.csv", row.names=F)

# remove needless items
rm(total.z, fd.judgment, fd.partmean, fd.partsd, partmean, partmeandf, partsddf, zscores)

# re-read csv file with zscores
fdtotal = read.csv('factive.final.zscores.csv', colClasses = c(rep('factor',6), rep('numeric',2)))

# subset dataframe
fd <- subset(fdtotal, !is.na(fdtotal$condition))


########################
### Build lmer model ###
########################

# check contrasts: contrasts change the significance of the main effect !!!
# (but the significance of the interaction stays the same)
# we want the "unmarked" levels ("Nominative" and "With SFP" to be zero)
# then the direction of the main effects
contrasts(fd$sfp)
contrasts(fd$top)

# if contrast are in the wrong direction, change them 
# (try using [1:2] instead of [2:1] if things don't work out)
#contrasts(id$sfp)=contr.treatment(2)[2:1]
#contrasts(id$top)=contr.treatment(2)[2:1]

# build lmer model
fm <- lmer(zscores~sfp*top+(1|participantID)+(1|tokenSet/item), data=fd, REML=TRUE)

# view summary, which gives a wald test?
summary(fm)
# save summary output to txt file
cat(capture.output(summary(fm)), file='fmsummary.txt', append=TRUE)


##############################################################
### Calculate condition mean, std. dev, and standard error ###
##############################################################
# Build a dataframe that aggregates over sfp and top levels
# Gives mean, standard deviation and standard error per condition
fdagg.condition = fd %>%
  group_by(sfp, top)%>%
  summarize(condition.mean = mean(zscores), condition.sd = sd(zscores), condition.se = condition.sd/sqrt(n()))

  
##############################
### Build interaction plot ###
##############################
# we can build an interaction plot with idagg.condition
fdplot = ggplot(fdagg.condition, aes(x=sfp, y=condition.mean, group = top, linetype=top)) + 
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
fdplot
# Save plot
ggsave('island.interactionplot.png', fdplot, height=7, width=7)


#####################################
### Post-hoc (Planned) comparison ###
#####################################
# pairwise comparison among fixed/random effects with emmeans package
# Using Bonferroni p-value adjustment for multiple tests (addresses Type-1 error)
emmeans(fm, pairwise~sfp*top, adjust="Bonferroni")

# save results as text file
cat(capture.output(emmeans(fm, pairwise~sfp*top, adjust="Bonferroni")), file='island_posthoc_percondition.txt', append=TRUE)
