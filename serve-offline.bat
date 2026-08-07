@echo off
rem 启动离线版文档站点（无需联网）
rem 需要本机已安装 Python（用于启动本地 HTTP 服务器）
cd /d "%~dp0site_offline"
echo 离线版文档已启动: http://localhost:8000 （Ctrl+C 停止）
start "" http://localhost:8000
python -m http.server 8000
