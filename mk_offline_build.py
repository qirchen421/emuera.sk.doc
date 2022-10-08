import glob
import yaml
import os

with open("mkdocs.yml", mode='r', encoding="utf-8") as fs:
    data = yaml.load(fs.read(), yaml.SafeLoader)
    del data['repo_url']
    del data['site_url']
    data['plugins'] = data['plugins'][1:]
    data['use_directory_urls'] = False
    fs.close()
    os.rename('mkdocs.yml', 'mkdocs.bak.yml')
    with open("mkdocs.yml", mode='w+', encoding='utf-8') as ofs:  
        yaml.dump(data, ofs, encoding='utf-8', allow_unicode=True)
os.system('mkdocs build -d release')
os.remove('mkdocs.yml')
os.rename('mkdocs.bak.yml', 'mkdocs.yml')
mapFiles = glob.glob("./release/**/*.map", recursive=True)
for file in mapFiles:
    os.remove(file)
os.remove('./release/404.html')
os.remove('./release/sitemap.xml')
os.remove('./release/sitemap.xml.gz')