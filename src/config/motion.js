export const transition = { type: "spring", duration: 0.8 };

export const slideAnimation = (direction) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};


export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",                // 使用彈簧物理模型來實現動畫效果
    damping: 5,                    // 阻尼係數，用來減少彈簧的振盪
    stiffness: 40,                 // 彈簧硬度，硬度越大，彈簧的反彈越快
    restDelta: 0.001,              // 當彈簧移動量小於此值時，動畫將停止，表示彈簧已經處於靜止狀態
    duration: 0.3,                 // 動畫持續時間，以秒為單位
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",                 // 使用彈簧物理模型來實現動畫效果
    damping: 7,                     // 阻尼係數，用來減少彈簧的振盪，此值較高表示振盪消減快
    stiffness: 30,                  // 彈簧硬度，硬度越大，彈簧的反彈越快
    restDelta: 0.001,               // 當彈簧移動量小於此值時，動畫將停止，表示彈簧已經處於靜止狀態
    duration: 0.6,                  // 動畫持續時間，以秒為單位
    delay: 0.2,                     // 動畫開始前的延遲時間，以秒為單位
    delayChildren: 0.2,             // 子元素開始動畫的延遲時間，以秒為單位
  },
};

