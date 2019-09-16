오늘 할 것

- 서버 / 클라 나누기
    - 겸직 해도 됨

- 셋팅
    - 서버
        - Typescript
        - TsLint
        - Koa
        - Jest for Test
        - (나중에) Minio(S3) Docker
        - (나중에) DynamoDB Docker
    - 클라
        - Typescript
        - TsLint
        - React
- DynamoDB 사용하자
- 테스트 코드


- 1주
  - Server
    - S3를 이용하여 다음의 API 제공
        - Put Object
        - Get Object
        - List Objects
  - Client
    - Server가 제공하는 Put, Get, List API를 이용하는 간단한 UI를 React로 제작하기
- 2주
  - 인증(Authentication) 제공하기
  - 파일 미리보기 기능 만들기
- 3주
  - Cold Storage 지원하기


# 주제 : 스트리머를 위한 파일 저장 시스템 개발

# Server

## Server - Minimum

- Create Repository 저장소 생성
    - 1 Repo : 1 Owner
    - 1 Repo : 1 Bucket
    - 1 Repo : N Users
- Operation 기능 제공하기
    - Put Object
    - Get Object
- Cost Optimization 가격 최소화 전략 실험 및 결정하기
    - S3
        - Region (Seoul? Tokyo? Virginia?)
        - Storage Class (Standard IA, One Zone IA)
        - Transfer Accelerataion
        - 프로젝트의 핵심가치(가장 싼 가격에 최고의 서비스 제공)에 맞는 전략을
- Cold Storage Class(S3 Glacier)
    - Change Object Stroage Class to Cold Stroage Class
        - By Life Cycle Rule
        - By Manually
    - Restore

## Server - Advanced

- Email Notification
    - Put Object
    - Restore (Glacier)
    - Throttling X분 단위로 모아서 메일 보내기
        - X분 동안 10개의 알림이 있을 때
            - 1개의 메일에 내용을 모아서 보내기
        - 안그러면 10개의 메일이 보내짐. 메일함 엄청 더러워짐
- Cost Tracking
    - AWS Cost Tag
- Permission 접근 제한하기
    - Deny/Allow
    - Subject 주어 (누가)
    - Object 목적어
    - Verb 동사

# Client

## Client - Minimum

- 파일 올리는 기능
    - (advanced)파일 스토리지 옵션 선택 기능
- 파일 다운로드 기능
- 파일 미리보기 기능
- 접근 제한 정책 추가 / 수정
- Cold Storage 규칙 추가 / 수정
- Cold Storage 으로 변경 / 에서 복원

## Client - Advanced

- Electron 앱 개발
    - 자동 파일 업로드
    - 자동 파일 다운로드