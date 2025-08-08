import os
import yaml

content_dir = r'd:\shenqingci-douyin\web-song\shenqingci-songlist\content'

tags = set()
categories = set()
artists = set()

for root, dirs, files in os.walk(content_dir):
    for file in files:
        if not file.endswith('.md'):
            continue
        filepath = os.path.join(root, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) > 2:
                front_matter_raw = parts[1]
                try:
                    front_matter = yaml.safe_load(front_matter_raw)
                    # 提取分类词条
                    if front_matter is None:
                        continue
                    if 'tag' in front_matter and front_matter['tag']:
                        tags.add(front_matter['tag'])
                    if 'category' in front_matter and front_matter['category']:
                        categories.add(front_matter['category'])
                    if 'artist' in front_matter and front_matter['artist']:
                        artists.add(front_matter['artist'])
                except Exception as e:
                    print(f"解析失败: {filepath}，错误: {e}")

print(f"[tag] 共 {len(tags)} 个词条: {sorted(tags)}")
print(f"[category] 共 {len(categories)} 个词条: {sorted(categories)}")
print(f"[artist] 共 {len(artists)} 个词条: {sorted(artists)}")