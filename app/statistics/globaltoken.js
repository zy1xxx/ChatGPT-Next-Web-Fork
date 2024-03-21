let state = {
  tokenCount: 0,
  lastUpdated: new Date(),
};

const getState = () => {
  return state;
};

const isDifferentDay = (date1, date2) => {
  return (
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getHours() !== date2.getHours() ||
    date1.getMinutes() !== date2.getMinutes()
  );
};

const updateTokenCount = async (newCount) => {
  const now = new Date();
  if (isDifferentDay(now, state.lastUpdated)) {
    // 如果是新的一天，记录前一天的token数量
    await fetch(`/api/logs?${state.tokenCount}`, { method: "GET" });
    // 重置token数量
    state.tokenCount = newCount;
  }
  state.tokenCount = state.tokenCount + newCount;
  state.lastUpdated = now;
};

module.exports = {
  getState,
  updateTokenCount,
};
