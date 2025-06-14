document.addEventListener('DOMContentLoaded', () => {
    // Hiệu ứng bong bóng nền
    function createBubbles() {
        const numBubbles = 15;
        for (let i = 0; i < numBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.animationDelay = `${Math.random() * 10}s`;
            bubble.style.animationDuration = `${10 + Math.random() * 10}s`;
            document.body.appendChild(bubble);
        }
    }
    createBubbles();

    const backgroundMusic = document.getElementById('background-music');
    
    // --- ĐIỀU CHỈNH ÂM LƯỢNG NHẠC NỀN ---
    backgroundMusic.volume = 0.19; // Đặt âm lượng ở mức 30% (giá trị từ 0.0 đến 1.0)

    // Luôn cố gắng phát nhạc khi trang home.html được tải, do người dùng đã tương tác ở trang trước
    backgroundMusic.play().catch(error => {
        console.log("Auto-play prevented on home page.");
    });

    // --- Game 1: Câu Đố Tình Yêu ---
    const game1Card = document.getElementById('game1');
    const quizPopup = document.getElementById('quiz-popup');
    const quizQuestion = document.getElementById('quiz-question');
    const quizAnswerInput = document.getElementById('quiz-answer');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const closeQuizBtn = document.getElementById('close-quiz-btn');

    const quizQuestions = [
        {
            question: "Chúng ta gặp nhau lần đầu vào tháng mấy?",
            answer: "5"
        },
        {
            question: "Biệt danh đáng yêu mà anh hay gọi em là gì?",
            answer: "Tomiseomi"
        },
        {
            question: "Món ăn đầu tiên mà anh và em đã cùng nhau ăn là gì?",
            answer: "phở" // Hoặc bất cứ món gì bạn muốn
        },
        {
            question: "Anh thích em ở điểm nào nhất?",
            answer: "điểm nào cũng thích" // Thay bằng tên phim của bạn
        }
    ];
    let currentQuestionIndex = 0;

    game1Card.addEventListener('click', () => {
        quizPopup.classList.remove('hidden');
        currentQuestionIndex = 0; // Reset câu hỏi khi mở lại
        displayQuizQuestion();
    });

    function displayQuizQuestion() {
        quizQuestion.textContent = quizQuestions[currentQuestionIndex].question;
        quizAnswerInput.value = '';
        quizFeedback.textContent = '';
        nextQuestionBtn.classList.add('hidden');
        checkAnswerBtn.classList.remove('hidden');
    }

    checkAnswerBtn.addEventListener('click', () => {
        const userAnswer = quizAnswerInput.value.trim().toLowerCase();
        const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            quizFeedback.textContent = "Chính xác! Em giỏi quá! ❤️";
            quizFeedback.style.color = '#c2e9fb';
            checkAnswerBtn.classList.add('hidden');
            if (currentQuestionIndex < quizQuestions.length - 1) {
                nextQuestionBtn.classList.remove('hidden');
            } else {
                quizFeedback.textContent = "Tuyệt vời! Em đã hoàn thành tất cả các câu hỏi rồi! Em đúng là người hiểu anh nhất! 😊";
                nextQuestionBtn.classList.add('hidden');
            }
        } else {
            quizFeedback.textContent = "Chưa đúng rồi! Em thử nghĩ lại xem. 😉";
            quizFeedback.style.color = '#ffdddd';
        }
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        displayQuizQuestion();
    });

    closeQuizBtn.addEventListener('click', () => {
        quizPopup.classList.add('hidden');
    });

    // --- Game 2: Thử Thách Vui Nhộn Của Anh ---
    const game2Card = document.getElementById('game2'); // Thẻ game card cho trò 2
    const challengePopup = document.getElementById('challenge-popup');
    const challengeInstruction = document.getElementById('challenge-instruction');
    const startChallengeBtn = document.getElementById('start-challenge-btn');
    const quizQuestionArea = document.getElementById('quiz-question-area');
    const challengeQuestion = document.getElementById('challenge-question');
    const challengeAnswerInput = document.getElementById('challenge-answer');
    const checkChallengeBtn = document.getElementById('check-challenge-btn');
    const challengeFeedback = document.getElementById('challenge-feedback');
    const nextChallengeBtn = document.getElementById('next-challenge-btn');
    const finalRevelation = document.getElementById('final-revelation');
    const closeChallengeBtn = document.getElementById('close-challenge-btn');

    const challengeData = [
        {
            question: "Chúng ta gặp nhau lần đầu vào tháng mấy?",
            answer: "5"
        },
        {
            question: "Biệt danh đáng yêu mà anh hay gọi em là gì?",
            answer: "Tomiseomi"
        },
        {
            question: "Món ăn đầu tiên mà anh và em đã cùng nhau ăn là gì?",
            answer: "phở" // Hoặc bất cứ món gì bạn muốn
        },
        {
            question: "Sau khi ăn xong thì mình đi đâu nhỉ",
            answer: "cà phê" // Thay bằng tên phim của bạn
        },
        {
            question: "Họ và tên đầy đủ của anh",
            answer: "Nguyễn Thành Trung" // Thay bằng tên phim của bạn
        },
        {
            question: "Em nghĩ anh có yêu em không ?",
            answer: "có" // Thay bằng tên phim của bạn
        },
        {
            question: "Em nghĩ anh có muon lam nguoi yeu em không ?",
            answer: "có" // Thay bằng tên phim của bạn
        }
        // Thêm nhiều câu hỏi hài hước khác ở đây!
    ];
    let currentChallengeIndex = 0;

    game2Card.addEventListener('click', () => { // Lắng nghe sự kiện click từ thẻ game card
        challengePopup.classList.remove('hidden');
        // Reset trạng thái ban đầu
        challengeInstruction.textContent = "Em đã sẵn sàng đối mặt với những thử thách 'khó nhằn' này chưa? Nhấn 'Bắt Đầu' nào!";
        startChallengeBtn.classList.remove('hidden');
        quizQuestionArea.classList.add('hidden');
        finalRevelation.classList.add('hidden');
        currentChallengeIndex = 0; // Reset index câu hỏi
    });

    startChallengeBtn.addEventListener('click', () => {
        startChallengeBtn.classList.add('hidden');
        quizQuestionArea.classList.remove('hidden');
        displayChallengeQuestion();
    });

    function displayChallengeQuestion() {
        challengeQuestion.textContent = challengeData[currentChallengeIndex].question;
        challengeAnswerInput.value = '';
        challengeFeedback.textContent = '';
        challengeFeedback.classList.remove('success'); // Xóa class success
        nextChallengeBtn.classList.add('hidden');
        checkChallengeBtn.classList.remove('hidden');
    }

    checkChallengeBtn.addEventListener('click', () => {
        const userAnswer = challengeAnswerInput.value.trim().toLowerCase();
        
        // Thay đổi logic kiểm tra để chấp nhận mọi đáp án cho các câu hỏi cụ thể
        // currentChallengeIndex 0: "Anh thường làm gì đầu tiên khi thức dậy..." (yêu cầu đáp án chính xác)
        // currentChallengeIndex 1: "Biệt danh hài hước mà em đặt cho anh..." (chấp nhận mọi đáp án)
        // currentChallengeIndex 2: "Nếu anh biến thành động vật..." (chấp nhận mọi đáp án)
        // currentChallengeIndex 3: "Điều điên rồ nhất anh từng làm..." (chấp nhận mọi đáp án)

        if (currentChallengeIndex === 1 || currentChallengeIndex === 2 || currentChallengeIndex === 3) {
            // Đây là các câu hỏi bạn muốn chấp nhận mọi đáp án
            challengeFeedback.textContent = "Chính xác!"; 
            challengeFeedback.classList.add('success');
            checkChallengeBtn.classList.add('hidden');
            if (currentChallengeIndex < challengeData.length - 1) {
                nextChallengeBtn.classList.remove('hidden');
            } else {
                quizQuestionArea.classList.add('hidden');
                finalRevelation.classList.remove('hidden');
                challengeInstruction.textContent = "Em thật sự quá giỏi! Bí mật cuối cùng đang chờ em!";
            }
        } else {
            // Đây là logic kiểm tra cho những câu hỏi CẦN ĐÁP ÁN CHÍNH XÁC (ví dụ: câu hỏi đầu tiên "ngáp")
            const correctAnswer = challengeData[currentChallengeIndex].answer.toLowerCase(); 

            if (userAnswer.includes(correctAnswer)) {
                challengeFeedback.textContent = "Chính xác!";
                challengeFeedback.classList.add('success');
                checkChallengeBtn.classList.add('hidden');
                if (currentChallengeIndex < challengeData.length - 1) {
                    nextChallengeBtn.classList.remove('hidden');
                } else {
                    quizQuestionArea.classList.add('hidden');
                    finalRevelation.classList.remove('hidden');
                    challengeInstruction.textContent = "Em thật sự quá giỏi! Bí mật cuối cùng đang chờ em!";
                }
            } else {
                challengeFeedback.textContent = "Sai bét nhè rồi! Em thử nghĩ lại xem, đừng để anh thất vọng nha! 😜";
                challengeFeedback.classList.remove('success');
            }
        }
    });

    nextChallengeBtn.addEventListener('click', () => {
        currentChallengeIndex++;
        displayChallengeQuestion();
    });

    closeChallengeBtn.addEventListener('click', () => {
        challengePopup.classList.add('hidden');
    });

    // --- Game 3: Lá Thư Bí Mật ---
    const game3Card = document.getElementById('game3');
    const letterPopup = document.getElementById('letter-popup');
    const closeLetterBtn = document.getElementById('close-letter-btn');

    game3Card.addEventListener('click', () => {
        letterPopup.classList.remove('hidden');
    });

    closeLetterBtn.addEventListener('click', () => {
        letterPopup.classList.add('hidden');
    });
});