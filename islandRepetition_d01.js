var showProgressBar = true;

var progressBarText = "진행 상황";

var manualSendResults = true;

var shuffleSequence = seq("introduction", "begin_practice", sepWith("sep", seq(startsWith("prac"))), "end_practice", sepWith("sep", seq(startsWith("ex"))), "results", "final");

var defaults = [
    "Separator", {
        transfer: 500,
        normalMessage: "다음 문장을 기다려 주세요."
    },

    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "답변(A)이 얼마나 자연스러운지 평가해주세요.",
        leftComment: "(아주 어색함)", rightComment: "(아주 자연스러움)"
    }
];

var items = [

    ["sep", "Separator", { }],

    ["introduction", "Form", {
                    html: { include: "01_introIsland_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
    
    ["begin_practice", Message, {
                    html: { include: "02_beginPracticeIsland_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
    
    ["end_practice", Message, {
                    html: { include: "03_endPracticeIsland_2.0.html" },
                    continueMessage: "다음으로 넘어가기"}],
    
    ["results", "__SendResults__", {}],

    ["final", Message, {
                    html: { include: "04_finalIsland_2.0.html" },
                    transfer: null}],
    
    //practice items
    ["prac.FI53", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 주희 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 주희는 모범생이라고 칭찬했어.</b>"}}],
    ["prac.FI41", "AcceptabilityJudgment", {s: {html: "Q: 네가 이집트의 피라미드에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 피라미드를 많은 사람이 힘들을 합쳤다고 말했어.</b>"}}],
    ["prac.FI07", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 피카소에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 피카소가 입체파 회화의 거장이라고 이야기했어.</b>"}}],
    ["prac.FI29", "AcceptabilityJudgment", {s: {html: "Q: 네가 다희 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 다희를 무슨 반이었던 것을 물어봤어.</b>"}}],
    ["prac.FI40", "AcceptabilityJudgment", {s: {html: "Q: 네가 하윤이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 하윤이가 여행을 좋아한다고 진술했어.</b>"}}],
    ["prac.FI42", "AcceptabilityJudgment", {s: {html: "Q: 네가 새 교실에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 새 교실에 창문이 너무 크다고 말했어.</b>"}}],
    ["prac.FI43", "AcceptabilityJudgment", {s: {html: "Q: 네가 수훈이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 졸업여행에 수훈이가 오면 좋겠다고 제안했어.</b>"}}],
    
    //experimental items
    ["ex.FI11", "AcceptabilityJudgment", {s: {html: "Q: 네가 너희 이웃들에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 우리 이웃들은 아무나 친절하다고 이야기했어.</b>"}}],
    ["ex.FI02", "AcceptabilityJudgment", {s: {html: "Q: 네가 예성이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 예성이는 말이 너무 많다고 불평했어.</b>"}}],
    ["ex.FI14", "AcceptabilityJudgment", {s: {html: "Q: 네가 학생들 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 학생들은 졸업을 하려면 시험을 통과한다고 설명했어.</b>"}}],
    ["ex.isl.nom.sfp.cnp.10", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 승현이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 승현이가 가족을 그리워한다는 사실을 말했어.</b>"}}],
    ["ex.FI63", "AcceptabilityJudgment", {s: {html: "Q: 네가 추석에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 추석이 서울에 차가 없는 것을 지적했어.</b>"}}],
    ["ex.FI25", "AcceptabilityJudgment", {s: {html: "Q: 네가 경찰관에 대해 질문했어? 무슨 질문을 했어?<br><b>A: 내가 경찰관은 뭐가 제일 힘들었던 것을 궁금해했어.</b>"}}],
    ["ex.isl.nom.nul.bec.03", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 소진이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 소진이가 성실하기 때문에 걔를 칭찬했어.</b>"}}],
    ["ex.FI49", "AcceptabilityJudgment", {s: {html: "Q: 네가 미영이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 미영이가 시험에 합격하면 확실하다고 이야기했어.</b>"}}],
    ["ex.isl.top.nul.rel.08", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 상호 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 상호는 졸업한 학교를 칭찬했어.</b>"}}],
    ["ex.FI13", "AcceptabilityJudgment", {s: {html: "Q: 네가 학생들에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 이 학생들의 공통점은 공부를 잘 한다고 말했어.</b>"}}],
    ["ex.isl.nom.sfp.wh.16", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 수정이 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 수정이가 어디에서 일하냐고 물었어.</b>"}}],
    ["ex.FI52", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 숙제에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 숙제가 너무 번거로워서 하지 말라는 것을 주장했어.</b>"}}],
    ["ex.FI08", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 인삼에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 인삼의 혈압을 낮춰주는 것을 주장했어.</b>"}}],
    ["ex.isl.top.nul.bec.02", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 민아 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 민아는 뻔뻔하기 때문에 걔를 흉봤어.</b>"}}],
    ["ex.FI56", "AcceptabilityJudgment", {s: {html: "Q: 네가 보람이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 보람이는 조건이 불리해서 게임에 진 거라고 두둔했어.</b>"}}],
    ["ex.isl.nom.nul.rel.06", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 재우 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 재우가 다니는 회사를 비난했어.</b>"}}],
    ["ex.FI61", "AcceptabilityJudgment", {s: {html: "Q: 네가 물리학에 대해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 물리학을 어려운 학문이라고 물어봤어.</b>"}}],
    ["ex.FI15", "AcceptabilityJudgment", {s: {html: "Q: 네가 조카에 대해 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 조카를 버릇이 없는 것을 지적했어.</b>"}}],
    ["ex.isl.top.nul.cnp.12", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 경희 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 경희는 친구들을 질투한다는 주장을 제시했어.</b>"}}],
    ["ex.FI60", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 호준이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 호준이는 좋은 친구라고 이야기했어.</b>"}}],
    ["ex.FI66", "AcceptabilityJudgment", {s: {html: "Q: 네가 일본어에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 일본어는 한국어랑 비슷한 점이 많다고 주장했어.</b>"}}],
    ["ex.isl.top.sfp.wh.14", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 용호 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 오늘 용호는 무엇을 무서워하냐고 질문했어.</b>"}}],
    ["ex.FI12", "AcceptabilityJudgment", {s: {html: "Q: 네가 소설가에 대해 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 소설가는 역사 소설 쓰는 것을 어렵다고 했어.</b>"}}],
    ["ex.isl.nom.nul.bec.01", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 민희 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 민희가 거짓말쟁이이기 때문에 걔를 욕했어.</b>"}}],
    ["ex.FI01", "AcceptabilityJudgment", {s: {html: "Q: 네가 러시아 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 러시아의 지붕이 둥근 예배당에 대해 설명했어.</b>"}}],
    ["ex.isl.nom.sfp.cnp.11", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 중현이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 중현이가 가족들을 사랑한다는 결론을 내렸어.</b>"}}],
    ["ex.FI17", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 진수 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 진수가 빨간 모자를 즐겨 쓴다고 이야기했어.</b>"}}],
    ["ex.FI48", "AcceptabilityJudgment", {s: {html: "Q: 네가 너희 동생에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 우리 동생이 사귀는 친구들이 이상하다고 화를 냈어.</b>"}}],
    ["ex.isl.nom.sfp.wh.13", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 해진이 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 해진이가 누구를 사랑하냐고 물어봤어.</b>"}}],
    ["ex.FI39", "AcceptabilityJudgment", {s: {html: "Q: 네가 민주 관련해서 질문을 했어? 무슨 질문을 했어?<br><b>A: 내가 민주의 동생이 여기 있느냐고 물어봤어.</b>"}}],
    ["ex.isl.top.nul.rel.05", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 혜수 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 혜수는 사는 동네를 무시했어.</b>"}}],
    ["ex.FI46", "AcceptabilityJudgment", {s: {html: "Q: 네가 새 컴퓨터에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 새 컴퓨터 때문에 아무도 일을 잘 한다고 보고했어.</b>"}}],
    ["ex.isl.top.nul.bec.04", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 상훈이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 상훈이는 배신자이기 때문에 걔를 험담했어.</b>"}}],
    ["ex.FI58", "AcceptabilityJudgment", {s: {html: "Q: 네가 태준이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 태준이를 이기적인 것을 욕했어.</b>"}}],
    ["ex.isl.top.sfp.wh.15", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 경환이 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 아까 경환이는 어디에 사냐고 물어봤어.</b>"}}],
    ["ex.FI22", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 김 회장님 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 김 회장님에게 손자가 세 명이라고 이야기했어.</b>"}}],
    ["ex.isl.nom.nul.rel.07", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 찬호 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 찬호가 태어난 나라를 모욕했어.</b>"}}],
    ["ex.FI36", "AcceptabilityJudgment", {s: {html: "Q: 네가 그 때 종수에 대해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 그 때 종수가 학생이냐고 물어봤어.</b>"}}],
    ["ex.isl.top.nul.cnp.09", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 강준이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 강준이는 미신을 믿는다는 소문을 전했어.</b>"}}],
    ["ex.FI32", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 외계인에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 외계인은 틀림없이 존재한다고 주장했어.</b>"}}],
    ["ex.FI16", "AcceptabilityJudgment", {s: {html: "Q: 네가 너희 가족들에 대해 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 가족들하고 다음주에는 주말 여행을 가겠다고 이야기했어.</b>"}}],
    ["ex.isl.nom.nul.rel.08", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 용선이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 용선이가 졸업한 학교를 칭찬했어.</b>"}}],
    ["ex.FI10", "AcceptabilityJudgment", {s: {html: "Q: 네가 최 의원 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 최 의원은 틀림없이 싸움이 나면 나가버렸다고 말했어.</b>"}}],
    ["ex.isl.top.nul.bec.03", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 대준이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 대준이는 성실하기 때문에 걔를 칭찬했어.</b>"}}],
    ["ex.FI50", "AcceptabilityJudgment", {s: {html: "Q: 네가 날씨에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 날씨 때문에 밖에 못 나가겠다고 불평했어.</b>"}}],
    ["ex.FI03", "AcceptabilityJudgment", {s: {html: "Q: 네가 동우 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 동우는 약속 시간을 안 지키는 것을 지적했어.</b>"}}],
    ["ex.isl.top.sfp.wh.16", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 사나 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 사나는 어디에서 일하냐고 물었어.</b>"}}],
    ["ex.FI66", "AcceptabilityJudgment", {s: {html: "Q: 네가 일본어에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 일본어는 한국어랑 비슷한 점이 많다고 주장했어.</b>"}}],
    ["ex.isl.top.nul.cnp.10", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 혜민이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 혜민이는 가족을 그리워한다는 사실을 말했어.</b>"}}],
    ["ex.FI55", "AcceptabilityJudgment", {s: {html: "Q: 네가 세종대왕에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 세종대왕은 훌륭한 임금이라고 말했어.</b>"}}],
    ["ex.FI23", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 준우에 대해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 준우가 걱정하고 있냐고 궁금해했어.</b>"}}],
    ["ex.isl.nom.nul.bec.02", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 성하 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 성하가 뻔뻔하기 때문에 걔를 흉봤어.</b>"}}],
    ["ex.FI34", "AcceptabilityJudgment", {s: {html: "Q: 네가 그 때 커피에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 그 때 커피가 진할수록 카페인이 많다고 이야기했어.</b>"}}],
    ["ex.isl.nom.sfp.wh.14", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 진솔이 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 오늘 진솔이가 무엇을 무서워하냐고 질문했어.</b>"}}],
    ["ex.FI05", "AcceptabilityJudgment", {s: {html: "Q: 네가 여행에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 여행을 바닷가를 간다고 계획했어.</b>"}}],
    ["ex.isl.nom.sfp.cnp.12", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 형민이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 형민이가 친구들을 질투한다는 주장을 제시했어.</b>"}}],
    ["ex.FI09", "AcceptabilityJudgment", {s: {html: "Q: 네가 희수 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 희수한테 편지를 오면 좋겠다고 고백했어.</b>"}}],
    ["ex.FI35", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 본 시험 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 시험이 너무 어렵게 나왔다고 짜증냈어.</b>"}}],
    ["ex.isl.top.nul.rel.06", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 이현이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 이현이는 다니는 회사를 비난했어.</b>"}}],
    ["ex.FI06", "AcceptabilityJudgment", {s: {html: "Q: 네가 영화 자막에 대해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 영화 자막을 번역이 이상하겠냐고 질문했어.</b>"}}],
    ["ex.FI62", "AcceptabilityJudgment", {s: {html: "Q: 네가 만화책 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 만화책은 읽기에 편하다고 이야기했어.</b>"}}],
    ["ex.isl.top.nul.bec.01", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 진구 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 진구는 거짓말쟁이이기 때문에 걔를 욕했어.</b>"}}],
    ["ex.FI37", "AcceptabilityJudgment", {s: {html: "Q: 네가 세진이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 세진이가 중학교를 졸업을 했다고 전했어.</b>"}}],
    ["ex.isl.top.sfp.wh.13", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 소미 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 소미는 누구를 사랑하냐고 물어봤어.</b>"}}],
    ["ex.FI04", "AcceptabilityJudgment", {s: {html: "Q: 네가 힙합에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 힙합은 가사가 어렵다는 데 불평했어.</b>"}}],
    ["ex.isl.top.nul.cnp.11", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 용호 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 용호는 가족들을 사랑한다는 결론을 내렸어.</b>"}}],
    ["ex.FI33", "AcceptabilityJudgment", {s: {html: "Q: 네가 학생들에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 학생들이 길들을 잃어버릴까 봐 걱정된다고 이야기했어.</b>"}}],
    ["ex.isl.top.nul.rel.07", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 나미 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 나미는 태어난 나라를 모욕했어.</b>"}}],
    ["ex.FI51", "AcceptabilityJudgment", {s: {html: "Q: 네가 표범에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 표범은 무서운 동물이라고 말했어.</b>"}}],
    ["ex.isl.nom.nul.bec.04", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 희민이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 어제 희민이가 배신자이기 때문에 걔를 험담했어.</b>"}}],
    ["ex.FI57", "AcceptabilityJudgment", {s: {html: "Q: 네가 은지 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 은지를 작품을 사람들한테 소개했어.</b>"}}],
    ["ex.FI59", "AcceptabilityJudgment", {s: {html: "Q: 네가 축구에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 축구가 격한 운동이라고 이야기했어.</b>"}}],
    ["ex.isl.nom.sfp.wh.15", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 인숙이 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 아까 인숙이가 어디에 사냐고 물어봤어.</b>"}}],
    ["ex.FI64", "AcceptabilityJudgment", {s: {html: "Q: 네가 서울역에 대해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 서울역의 출입구가 총 몇 개인가를 물어봤어.</b>"}}],
    ["ex.isl.nom.sfp.cnp.09", "AcceptabilityJudgment", {s: {html: "Q: 네가 오늘 나희 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 오늘 나희가 미신을 믿는다는 소문을 전했어.</b>"}}],
    ["ex.FI47", "AcceptabilityJudgment", {s: {html: "Q: 네가 영진이에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 작년에 졸업한 영진이가 착하다고 말했어.</b>"}}],
    ["ex.isl.nom.nul.rel.05", "AcceptabilityJudgment", {s: {html: "Q: 네가 아까 민용이 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 아까 민용이가 사는 동네를 무시했어.</b>"}}],
    ["ex.FI30", "AcceptabilityJudgment", {s: {html: "Q: 네가 청소에 대해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 청소는 귀찮은 일이라고 말했어.</b>"}}],
    ["ex.FI65", "AcceptabilityJudgment", {s: {html: "Q: 네가 어제 노벨상 관련해서 질문했어? 무슨 질문을 했어?<br><b>A: 내가 어제 노벨상을 연관되는 분야에 대해서 질문했어.</b>"}}],
    ["ex.FI54", "AcceptabilityJudgment", {s: {html: "Q: 네가 지수 관련해서 이야기했어? 무슨 이야기를 했어?<br><b>A: 내가 지수는 차가 막혀서 지각했다고 설명했어.</b>"}}]
];