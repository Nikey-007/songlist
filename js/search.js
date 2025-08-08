document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("search-box");
  const resultsDiv = document.getElementById("search-results");

  fetch("/songlist/index.json")
    .then((res) => {
      if (!res.ok) throw new Error("网络响应不是OK");
      return res.json();
    })
    .then((data) => {
      const fuse = new Fuse(data, {
        shouldSort: true,
        threshold: 0.4,
        keys: [
          { name: "title", weight: 0.5 },
          { name: "artist", weight: 0.3 },
          { name: "category", weight: 0.1 },
          { name: "language", weight: 0.05 },
          { name: "tag", weight: 0.05 }
        ]
      });

      searchBox.addEventListener("input", function () {
        const query = this.value.trim();
        if (!query) {
          resultsDiv.innerHTML = "";
          return;
        }

        const results = fuse.search(query);

        // 完全匹配 artist 时跳转
        const artistMatch = data.find(
          item => item.artist && item.artist.trim().toLowerCase() === query.toLowerCase()
        );

        if (artistMatch) {
          const artistSlug = encodeURIComponent(artistMatch.artist.trim());
          window.location.href = `/songlist/artists/${artistSlug}/`;
          return;
        }

        if (results.length === 0) {
          resultsDiv.innerHTML = '<p style="color:#888;">没有找到匹配的内容。</p>';
          return;
        }

        resultsDiv.innerHTML = results
          .slice(0, 20)
          .map(({ item }) => {
            // 这里确保拼接 /songlist 路径
            const href = `/songlist${item.url}`;
            return `
              <div style="padding:8px 0; border-bottom: 1px solid #eee;">
                <a href="${href}" style="text-decoration:none; color:#0e7490;">
                  <strong>${item.title}</strong>
                </a>
                <span style="color:#555; margin-left:8px;">
                  - ${item.artist || "未知"} (${item.language ? item.language.join(',') : "未知语言"})
                </span>
              </div>
            `;
          })
          .join("");
      });
    })
    .catch((err) => {
      console.error("加载搜索索引失败:", err);
      resultsDiv.innerHTML = '<p style="color:red;">加载搜索失败。</p>';
    });
});
