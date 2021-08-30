export const API_END_POINT = 'https://kdt.roto.codes';

export const request = async (url, options = {}, username = 'jonghyeon') => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': username,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 처리중 뭔가 이상합니다!');
  } catch (e) {
    alert(e);
  }
};
