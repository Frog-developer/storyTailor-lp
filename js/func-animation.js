const funcImages = [
    './assets/images/home/word/0_page.png',
    './assets/images/home/word/1_page.png',
    './assets/images/home/word/2_page.png',
    './assets/images/home/word/3_page.png',
];

let currentFuncImageIndex = 0;
let currentFuncContent = document.getElementById('current-func-content');
let nextFuncContent = document.getElementById('next-func-content');

// 初期化
function initializeFuncAnimation() {
    // 最初の画像を設定
    currentFuncContent.src = funcImages[0];
    nextFuncContent.src = funcImages[1];
    
    // 位置とスタイルを設定
    currentFuncContent.style.opacity = '1';
    nextFuncContent.style.opacity = '0';
}

// 画像切り替え
function changeFuncImage() {
    // 次のインデックスを計算
    const nextImageIndex = (currentFuncImageIndex + 1) % funcImages.length;
    
    // 次の画像を準備
    nextFuncContent.src = funcImages[nextImageIndex];
    
    // フェードエフェクト
    currentFuncContent.style.opacity = '0';
    nextFuncContent.style.opacity = '1';
    
    // アニメーション後に画像を入れ替え
    setTimeout(() => {
        // 現在の画像インデックスを更新
        currentFuncImageIndex = nextImageIndex;
        
        // 現在の画像と次の画像を入れ替え
        const temp = currentFuncContent;
        currentFuncContent = nextFuncContent;
        nextFuncContent = temp;
        
        // 次の画像を透明に
        nextFuncContent.style.opacity = '0';
        
        // ID も入れ替え
        currentFuncContent.id = 'current-book-content';
        nextFuncContent.id = 'next-book-content';
        
        // 次の画像を更新
        const futureImageIndex = (nextImageIndex + 1) % funcImages.length;
        nextFuncContent.src = funcImages[futureImageIndex];
    }, 1000);
}

// 初期化
initializeFuncAnimation();

// 3秒ごとに画像を切り替え
setInterval(changeFuncImage, 3000);
