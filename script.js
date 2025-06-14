document.addEventListener('DOMContentLoaded', () => {
    // --- Khởi tạo các phần tử cho câu hỏi ban đầu ---
    const firstQuestionContainer = document.getElementById('first-question-container');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const loveMessage = document.getElementById('love-message');
    const loginContainer = document.querySelector('.login-container'); // Chọn login container

    const backgroundMusic = document.getElementById('background-music');
    let hasInteracted = false;

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

    // --- Logic cho câu hỏi "Em có yêu anh không?" ---
    yesButton.addEventListener('click', () => {
        loveMessage.classList.remove('hidden'); // Hiện thông báo "Anh yêu em"
        loveMessage.style.opacity = 1; // Đảm bảo opacity được set để animation chạy
        
        // Phát nhạc khi bấm có
        if (!hasInteracted) {
            backgroundMusic.play().catch(error => {
                console.log("Auto-play prevented, will play on next interaction.");
            });
            hasInteracted = true;
        }

        // Ẩn câu hỏi sau một thời gian và hiện form đăng nhập
        setTimeout(() => {
            firstQuestionContainer.classList.add('hidden'); // Ẩn toàn bộ phần hỏi
            loginContainer.classList.add('visible'); // Hiện form đăng nhập
        }, 2000); // Ẩn sau 2 giây
    });

    noButton.addEventListener('mouseover', () => {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    });

    noButton.addEventListener('click', (event) => {
        // Ngăn chặn hành động mặc định của nút (nếu có)
        event.preventDefault(); 
        // Khi người dùng cố bấm "Không", nó vẫn sẽ chạy đi
        // Không làm gì khác ở đây, chỉ để hiệu ứng di chuyển là đủ
    });

    // --- Logic Form Đăng Nhập ---
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Thay đổi thông tin đăng nhập tại đây
    const correctUsername = "18052025"; // Ngày sinh của bạn và người yêu (DDMMYYYY)
    const correctPassword = "16051702"; // Ngày sinh của người yêu (DDMMYYYY)

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn form gửi đi mặc định

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            // Chuyển hướng sang trang home.html
            window.location.href = 'home.html';
        } else {
            errorMessage.textContent = 'Sai tài khoản hoặc mật khẩu rồi bé iu! Thử lại nha! 😉';
            errorMessage.classList.remove('hidden');
            // Thêm hiệu ứng rung cho form
            loginForm.classList.add('shake');
            loginForm.addEventListener('animationend', () => {
                loginForm.classList.remove('shake');
            }, { once: true });
        }
    });

    // Thêm lắng nghe sự kiện để phát nhạc khi có tương tác đầu tiên với trang (ngoài nút "Có")
    document.body.addEventListener('click', () => {
        if (!hasInteracted) {
            backgroundMusic.play().catch(error => {
                console.log("Auto-play prevented, will play on next interaction.");
            });
            hasInteracted = true;
        }
    });
});