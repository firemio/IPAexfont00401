document.addEventListener('DOMContentLoaded', () => {
    const fileListElement = document.getElementById('fileList');
    const toastElement = document.getElementById('toast');

    const files = [
        { name: 'ipaexm.woff2', description: 'IPAex明朝 - 4.0M', link: true },
        { name: 'ipaexg.woff2', description: 'IPAexゴシック - 2.9M', link: true },
        { name: 'ipaexm.ttf', description: 'IPAex明朝 - 7.6M', link: true },
        { name: 'ipaexg.ttf', description: 'IPAexゴシック - 5.9M', link: true },
        { name: 'Jigmo2.ttf', description: 'Jigmo2フォント - 31MB', link: true },
        { name: 'IPA_Font_License_Agreement_v1.0.txt', description: 'IPAフォントライセンスv1.0', link: false },
        { name: 'Readme_IPAexfont00401.txt', description: 'フォント説明文書', link: false },
    ];

    function showToast(message) {
        toastElement.innerHTML = 'URLをクリップボードにコピーしました<br>' + message;
        toastElement.style.display = 'block';
        
        setTimeout(() => {
            toastElement.style.display = 'none';
        }, 2000);
    }

    function getFullUrl(filename) {
        const baseUrl = window.location.origin + window.location.pathname;
        return baseUrl.replace(/index\.html$/, '') + filename;
    }

    files.forEach(file => {
        const listItem = document.createElement('div');
        listItem.className = 'file-item';
        
        const link = document.createElement('a');
        link.href = file.name;
        link.textContent = `${file.name} - ${file.description}`;
        listItem.appendChild(link);
        
        if (file.link) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy URL';
            copyButton.onclick = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    const fullUrl = getFullUrl(file.name);
                    await navigator.clipboard.writeText(fullUrl);
                    showToast(fullUrl);
                } catch (err) {
                    showToast('コピーに失敗しました');
                    console.error(err);
                }
            };
            listItem.appendChild(copyButton);
        }
        
        fileListElement.appendChild(listItem);
    });
});
