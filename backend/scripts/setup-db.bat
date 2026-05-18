@echo off
REM Script para inicializar o banco de dados localmente (Windows)
REM Este script cria o banco de dados e popula com dados de teste

echo.
echo Inicializando o banco de dados da Oficina...
echo.

REM Verificar se .env existe
if not exist .env (
    echo Arquivo .env nao encontrado. Copiando de .env.example...
    copy .env.example .env
    echo Arquivo .env criado. Configure seus dados de conexao se necessario.
    echo.
)

REM Ler arquivo .env
for /f "delims== tokens=1,2" %%A in (.env) do (
    if not "%%A"=="" (
        if not "%%A:~0,1%%"=="#" (
            set %%A=%%B
        )
    )
)

echo Dados de conexao:
echo    Host: %DB_HOST:~%
echo    Usuario: %DB_USER:~%
echo    Banco: %DB_NAME:~%
echo.

REM Verificar se mysql está disponível
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo MySQL nao encontrado no PATH!
    echo    Por favor, instale MySQL ou adicione sua pasta bin ao PATH do Windows.
    pause
    exit /b 1
)

REM Criar banco se não existir
echo Criando banco de dados...
mysql -h %DB_HOST% -u %DB_USER% %DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"
if %ERRORLEVEL% NEQ 0 (
    echo Erro ao criar o banco de dados!
    pause
    exit /b 1
)
echo Banco de dados criado/verificado com sucesso!
echo.

REM Importar estrutura
echo Importando estrutura do banco...
mysql -h %DB_HOST% -u %DB_USER% %DB_PASSWORD% %DB_NAME% < ..\Database\oficina.sql
if %ERRORLEVEL% NEQ 0 (
    echo Erro ao importar a estrutura!
    pause
    exit /b 1
)
echo Estrutura importada com sucesso!
echo.

REM Verificar se node_modules existe
if not exist node_modules (
    echo Instalando dependencias...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Erro ao instalar dependencias!
        pause
        exit /b 1
    )
)

REM Executar seeder
echo Populando banco com dados de teste...
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo Erro ao popular o banco de dados!
    pause
    exit /b 1
)

echo.
echo Banco de dados inicializado com sucesso!
echo Seu ambiente esta pronto para desenvolvimento!
echo.
pause
