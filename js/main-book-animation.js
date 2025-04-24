const bookImages = [
    './assets/images/home/book/0_front.png',
    './assets/images/home/book/1_page.png',
    './assets/images/home/book/2_page.png',
    './assets/images/home/book/3_page.png',
    './assets/images/home/book/4_page.png',
    './assets/images/home/book/5_page.png',
    './assets/images/home/book/6_back.png'
];

let currentBookImageIndex = 0;
let currentBookContent = document.getElementById('main-current-book-content');
let nextBookContent = document.getElementById('main-next-book-content');

// 初期化
function initializeBookAnimation() {
    // 最初の画像を設定
    currentBookContent.src = bookImages[0];
    nextBookContent.src = bookImages[1];
    
    // 位置とスタイルを設定
    currentBookContent.style.opacity = '1';
    nextBookContent.style.opacity = '0';
}

// 画像切り替え
function changeBookImage() {
    // 次のインデックスを計算
    const nextImageIndex = (currentBookImageIndex + 1) % bookImages.length;
    
    // 次の画像を準備
    nextBookContent.src = bookImages[nextImageIndex];
    
    // フェードエフェクト
    currentBookContent.style.opacity = '0';
    nextBookContent.style.opacity = '1';
    
    // アニメーション後に画像を入れ替え
    setTimeout(() => {
        // 現在の画像インデックスを更新
        currentBookImageIndex = nextImageIndex;
        
        // 現在の画像と次の画像を入れ替え
        const temp = currentBookContent;
        currentBookContent = nextBookContent;
        nextBookContent = temp;
        
        // 次の画像を透明に
        nextBookContent.style.opacity = '0';
        
        // ID も入れ替え
        currentBookContent.id = 'current-book-content';
        nextBookContent.id = 'next-book-content';
        
        // 次の画像を更新
        const futureImageIndex = (nextImageIndex + 1) % bookImages.length;
        nextBookContent.src = bookImages[futureImageIndex];
    }, 1000);
}

// 初期化
initializeBookAnimation();

// 3秒ごとに画像を切り替え
setInterval(changeBookImage, 3000);
