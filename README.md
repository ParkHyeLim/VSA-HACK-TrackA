# 1. 서비스 개요

> **서비스명**
>
Interactive 대기 시스템

> **한줄 소개**
>
블랙프라이데이 기간에 사용자가 몰릴 때 주문에서 결제페이지로 넘어갈 때 지연되는 경우, 그 시간동안 사용자에 콘텐츠를 제공한다.

> **개발 동기**
>
특정 기간에 사용자가 많이 모일 것을 예상하는 경우, 관리자는 대개 서버를 확충하여 분할하는 방법을 채택한다. 그럼에도 불구하고, 수요 예측을 정확하게 하지 못해 사용자들이 서버 내에서 대기해야만 하는 상황이 발생할 수 있다. 이에 본 조는 사용자가 주문 버튼을 누른 후  결제 페이지로 넘어갈 때 발생하는 지연 상황을 가정하여, 사용자가 지연 상황에서도 화면을 나가지 않고 원활히 결제페이지로 넘어갈 수 있도록 방법을 강구하기로 하였다.

# 3. 세부 내용

> **사용 기술**
> - Front - React
> - Back -  NodeJs, WebSocket
> - Server - Aws, Redis

> **구현 내용 :**
> - Front - 대기화면에서 AI를 활용하여 마우스나 사용자의 모션을 인식하여 화면에 효과 부여
> - Back - 사용자 접속 시 접속 중인 이용자 수를 비교하여 필요할 경우에 대기열 등록, 웹 소켓을 활용하여 실시간으로 줄어드는 대기자 수가 화면에 반영될 수 있게 구현

# 4. 기대 효과

서비스를 **통해 얻을 수 이점, 발전 방향성 등을 알려주세요.**

---

### 이점

- 사용자의 지루함 해결
    - 기존의 다수의 쇼핑몰을 물건을 사고 파는 것에 집중했다면, 본 기능은 사용자가 지루하게 기다리는 시간을 활용하여, 사용자가 더 오래 서버에 머무를 수 있게 한다.

### 발전 방향성

- 추후 해당 쇼핑몰의 특징에 맞춘, 맞춤형 기능을 더할 수 있다.
    - 해당 제품을 구매한 제품을 구매한 사람들이 구매한 제품 추천
    - 해당 페이지에서 추후 사용자에게 실제 제공할 인터페이스를 사용자에서 미리 시범 운영해 볼 수 있음

# 5. 스크린샷

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b9618703-706d-45d1-83b6-a9462a5e42bf/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd2d5f6a-dc1b-43cc-8a1e-2d31ed895178/Untitled.png)

![스크린샷 2023-08-30 오전 11.48.59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fae5a601-7877-4c59-99e3-ffd82fa0e9a0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-08-30_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.48.59.png)

![스크린샷 2023-08-30 오전 11.49.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d668056-54b4-4a6b-9c14-75fc60da9c1f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-08-30_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.49.10.png)
