// 讀取檔案並以DataURL格式返回
export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();  // 創建一個檔案讀取器
    fileReader.onload = () => resolve(fileReader.result);  // 讀取成功後解析結果
    fileReader.readAsDataURL(file);  // 讀取檔案為DataURL格式
  });



// 根據給定的顏色，獲取對比色（黑色或白色）
export const getContrastingColor = (color) => {
  // 若存在，移除顏色碼前的'#'字符
  const hex = color.replace("#", "");

  // 將六位十六進制數轉換為RGB值
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 計算顏色的亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 根據亮度返回黑色或白色
  return brightness > 128 ? "black" : "white";
};
