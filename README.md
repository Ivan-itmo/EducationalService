## Последвательность команд для запуска

Перед тем как собирать WAR-файл, нужно **обязательно пересобрать Angular и скопировать результат в папку `src/main/webapp`**.
Команды написаны, если идем от корня проекта.

### Локалка
#### 1. Собери фронтенд:

```bash
cd frontend
ng build --configuration production
```

#### 2. Перекинь в папку бэкэнда (из корня проекта):

```bash
cp -r frontend/dist/frontend/browser/* src/main/webapp/
```

#### 3. Собери варник (WAR):

```bash
mvn clean package
```

#### 4. Закинь на сервер:

```bash
scp target/ROOT.war ubuntu@158.160.72.78:/home/ubuntu/

```

#### 0. Если надо посомтреть фронт на локалке:
```bash
cd frontend
ng build --configuration production
ng serve
```

### Сервер

#### 1. Подключиться к серверу

```bash
ssh -l ubuntu 158.160.72.78
```

#### 2. Деплоить приложение

```bash
sudo cp ROOT.war /opt/wildfly/standalone/deployments/
```

#### 3. Запустить WildFly (если не запущен)

```bash
sudo /opt/wildfly/bin/standalone.sh -b 0.0.0.0
```

#### 4. Подключиться к базе данных (для отладки)

```bash
sudo -u postgres psql -d db
```
