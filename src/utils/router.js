const ROUTE_CHANGE_EVENT_NAME = 'route-change';
const POPSTATE_EVENT_NAME = 'popstate';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { pushUrl, replaceUrl } = e.detail;

    pushUrl && history.pushState(null, null, pushUrl);
    replaceUrl && history.replaceState(null, null, replaceUrl);

    onRoute();
  });
  // 뒤로가기 시에도 라우팅
  window.addEventListener(POPSTATE_EVENT_NAME, () => {
    onRoute();
  });
};

export const push = (pushUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        pushUrl,
      },
    })
  );
};

export const replace = (replaceUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        replaceUrl,
      },
    })
  );
};

export const replaceBack = () => {
  history.replaceState(null, null, '/');
  history.back();
};
