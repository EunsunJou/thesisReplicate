var showProgressBar = true;

var progressBarText = "진행 상황";

var manualSendResults = true;

var shuffleSequence = seq("introduction", "begin_practice", sepWith("sep", seq(startsWith("prac"))), "end_practice", sepWith("sep", seq(startsWith("ex"))), "results", "final");

var defaults = [
    "Separator", {
        transfer: 750,
        normalMessage: "다음 문장을 기다려 주세요."
    },

    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "문장이 얼마나 자연스러운지 평가해주세요.",
        leftComment: "(아주 어색함)", rightComment: "(아주 자연스러움)"
    }
];

var items = [

    ["sep", "Separator", { }],

    ["introduction", "Form", {
                    html: { include: "01_intro_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
	
    ["begin_practice", Message, {
                    html: { include: "02_beginPractice_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
    
    ["end_practice", Message, {
                    html: { include: "03_endPractice_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
    
    ["results", "__SendResults__", {}],

    ["final", Message, {
                    html: { include: "04_final_2.0.html" },
                    transfer: null}],
    
    //practice items
    ["prac.FF36", "AcceptabilityJudgment", {s: {html: "Q: 네가 누구를 좋아하니?<br><b>A: 내가 종수를 좋아해.</b>"}}],
	["prac.FF06", "AcceptabilityJudgment", {s: {html: "Q: 네가 영화 자막에 대해서 뭐라고 말했어?<br><b>A: 내가 영화 자막을 번역이 이상하겠다고 말했어.</b>"}}],
	["prac.FF02", "AcceptabilityJudgment", {s: {html: "Q: 네가 새 교실에 대해서 뭐라고 생각했어?<br><b>A: 내가 교실에 창문이 너무 크다고 생각했어.</b>"}}],
	["prac.FF40", "AcceptabilityJudgment", {s: {html: "Q: 네가 무엇을 궁금하다고 했어?<br><b>A: 내가 사원들은 뭐가 제일 힘들었던 것을 궁금해했어.</b>"}}],
	["prac.FF19", "AcceptabilityJudgment", {s: {html: "Q: 네가 졸업을 하려면 무엇을 해야 하니?<br><b>A: 내가 졸업을 하려면 시험을 통과해.</b>"}}],
	["prac.FF23", "AcceptabilityJudgment", {s: {html: "Q: 네가 확성기를 어디에 사용했니?<br><b>A: 내가 소리가 들리도록 하는 데에 확성기를 사용했어.</b>"}}],
	["prac.FF08", "AcceptabilityJudgment", {s: {html: "Q: 네가 커피에 대해서 뭐라고 주장했어?<br><b>A: 내가 커피의 혈압을 낮춰주는 것을 주장했어.</b>"}}],
    
    //experimental items
	["ex.FF46", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 백화점에서 무엇을 샀어?<br><b>A: 내가 오늘 백화점에서 시계를 비싼 것을 샀어.</b>"}}],
	["ex.FF43", "AcceptabilityJudgment", {s: {html: "Q: 네가 철수한테 무엇에 대해서 사과했어?<br><b>A: 내가 철수를 머리를 때린 것을 사과했어.</b>"}}],
	["ex.FF12", "AcceptabilityJudgment", {s: {html: "Q: 네가 지난주에 만난 이웃들이 어땠어?<br><b>A: 내가 지난주에 만난 이웃들은 아무나 친절했어.</b>"}}],
	["ex.FF60", "AcceptabilityJudgment", {s: {html: "Q: 네가 지호에 대해서 무엇을 부러워했어?<br><b>A: 내가 지호를 키가 큰 것을 부러워했어.</b>"}}],
	["ex.FF54", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 외계인에 대해서 뭐라고 주장했어?<br><b>A: 내가 오늘 외계인은 틀림없이 존재한다고 주장했어.</b>"}}],
	["ex.top.top.sfp.03", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 민호에 대해서 무엇을 기뻐했어?<br><b>A: 내가 어제 민호는 운동을 즐긴다는 것을 기뻐했어.</b>"}}],
	["ex.FF20", "AcceptabilityJudgment", {s: {html: "Q: 네가 조카를 왜 혼냈니?<br><b>A: 내가 조카를 버릇이 없는 것을 혼냈어.</b>"}}],
	["ex.FF13", "AcceptabilityJudgment", {s: {html: "Q: 네가 그저께 누구를 마주쳤어?<br><b>A: 내가 그저께 현서를 먼저 다시 마주쳤어.</b>"}}],
	["ex.top.nom.nul.08", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 소희에 대해서 무엇을 안타까워했어?<br><b>A: 내가 어제 소희가 친구들을 질투하는 것을 안타까워했어.</b>"}}],
	["ex.FF01", "AcceptabilityJudgment", {s: {html: "Q: 네가 러시아에 대해서 무엇을 말했어?<br><b>A: 내가 러시아의 지붕이 둥근 예배당이 멋있다고 말했어.</b>"}}],
	["ex.FF48", "AcceptabilityJudgment", {s: {html: "Q: 네가 다희한테 무엇을 물어봤어?<br><b>A: 내가 다희를 무슨 반이었던 것을 물어봤어.</b>"}}],
	["ex.FF24", "AcceptabilityJudgment", {s: {html: "Q: 네가 다음주에 무엇을 하기로 했니?<br><b>A: 내가 다음주에는 주말 여행을 가기로 했어.</b>"}}],
	["ex.top.nom.sfp.05", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 하니에 대해서 무엇을 깨달았어?<br><b>A: 내가 오늘 하니가 가족을 사랑한다는 것을 깨달았어.</b>"}}],
	["ex.FF38", "AcceptabilityJudgment", {s: {html: "Q: 네가 재우한테 무엇을 가르쳐 줬어?<br><b>A: 내가 재우한테 게임에서 이기는 방법을 가르쳐 줬어.</b>"}}],
	["ex.FF27", "AcceptabilityJudgment", {s: {html: "Q: 네가 지난주에 무엇을 했어?<br><b>A: 내가 지난주에 부산에 갔다 왔어.</b>"}}],
	["ex.top.top.nul.02", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 수아에 대해서 무엇을 눈치챘어?<br><b>A: 내가 아까 수아는 고향을 그리워하는 것을 눈치챘어.</b>"}}],
	["ex.FF51", "AcceptabilityJudgment", {s: {html: "Q: 네가 최근에 왜 이사를 갔어?<br><b>A: 내가 최근에 부모님을 직장에서 새로 옮기시느라 이사를 갔어.</b>"}}],
	["ex.FF58", "AcceptabilityJudgment", {s: {html: "Q: 네가 종수에게 무엇에 대해서 질문했어?<br><b>A: 내가 종수의 미래 계획에 대해서 질문했어.</b>"}}],
	["ex.FF29", "AcceptabilityJudgment", {s: {html: "Q: 네가 진영이한테 뭐라고 말했어?<br><b>A: 내가 진영이한테 음악소리를 낮추라고 말했어.</b>"}}],
	["ex.top.top.sfp.07", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 동수에 대해서 무엇을 놀라워했어?<br><b>A: 내가 아까 동수는 중국어를 잘한다는 것을 놀라워했어.</b>"}}],
	["ex.FF04", "AcceptabilityJudgment", {s: {html: "Q: 네가 그 때 힙합에 대해서 무엇을 불평했어?<br><b>A: 내가 힙합은 가사가 어렵다는 데 불평했어.</b>"}}],
	["ex.FF26", "AcceptabilityJudgment", {s: {html: "Q: 네가 얼마동안 약을 먹었어?<br><b>A: 내가 약을 사흘동안 먹었어.</b>"}}],
	["ex.top.nom.sfp.01", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 지호에 대해서 무엇을 기억해냈어?<br><b>A: 내가 오늘 지호가 미신을 믿는다는 것을 기억해냈어.</b>"}}],
	["ex.FF34", "AcceptabilityJudgment", {s: {html: "Q: 네가 지금 어디 있어?<br><b>A: 내가 지금 앞줄에서 빠져있어.</b>"}}],
	["ex.FF10", "AcceptabilityJudgment", {s: {html: "Q: 네가 희수한테 무엇을 고백했어?<br><b>A: 내가 희수한테 편지를 오면 좋겠다고 고백했어.</b>"}}],
	["ex.top.top.nul.06", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 아람이에 대해서 무엇을 알아냈어?<br><b>A: 내가 아까 아람이는 개를 무서워하는 것을 알아냈어.</b>"}}],
	["ex.FF39", "AcceptabilityJudgment", {s: {html: "Q: 네가 지난주에 아이들한테 무엇을 해줬어?<br><b>A: 내가 지난주에 아이들이 좋아하는 이야기를 들려줬어.</b>"}}],
	["ex.FF52", "AcceptabilityJudgment", {s: {html: "Q: 네가 여행에 대해서 무슨 이야기를 했어?<br><b>A: 내가 여행이 귀찮은 일이라고 말했어.</b>"}}],
	["ex.top.nom.nul.04", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 시현이에 대해서 무엇을 슬퍼했어?<br><b>A: 내가 어제 시현이가 문학을 싫어하는 것을 슬퍼했어.</b>"}}],
	["ex.FF11", "AcceptabilityJudgment", {s: {html: "Q: 네가 언제 나가버렸어?<br><b>A: 내가 틀림없이 싸움이 나면 나가버렸어.</b>"}}],
	["ex.FF59", "AcceptabilityJudgment", {s: {html: "Q: 네가 미선이에 대해서 무슨 이야기를 했어?<br><b>A: 내가 미선이는 머리가 좋다고 이야기했어.</b>"}}],
	["ex.FF28", "AcceptabilityJudgment", {s: {html: "Q: 네가 지난주에 무엇을 하려고 했어?<br><b>A: 내가 지난주에 선물을 친구들한테 주려고 했어.</b>"}}]
];