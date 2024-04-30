import { useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';  // useFrame hook，用於創建動畫循環
import { easing } from 'maath';  // 從 maath 庫中引入 easing 工具，用於平滑過渡

import state from '../store';

const CameraRig = ({ children }) => {
    const group = useRef();  // 創建一個 ref 用來引用 three.js 中的 group 對象
    const snap = useSnapshot(state);  // 獲取全局狀態的快照

    useFrame((state, delta) => {  // 在每一幀更新時執行以下代碼
        const isBreakpoint = window.innerWidth <= 1260;  // 視窗寬度小於1260時
        const isMobile = window.innerWidth <= 600;  // 視窗寬度小於600時

        let targetPosition = [-0.4, 0, 2];  // 設置預設的目標位置 [x,y,z]
        if (snap.intro) {  // 在首頁時
            if (isBreakpoint) targetPosition = [0, 0, 2];  // 斷點以下調整位置
            if (isMobile) targetPosition = [0, 0.2, 2.5];  // 移動設備調整位置 
        } else {  // 在設計頁時
            if (isMobile) targetPosition = [0, 0, 2.5]
            else targetPosition = [0, 0, 2];
        }

        // 設定模型攝影機的位置，並進行平滑過渡
        easing.damp3(state.camera.position, targetPosition, 0.25, delta)

        // 平滑設定模型旋轉
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 8, -state.pointer.x / 4, 0], //轉動角度
            0.15,  // 轉動速度
            delta
        )
    })

    return <group ref={group}>{children}</group>  // 返回 three.js 的 group 元件，並將 children 嵌入其中
}

export default CameraRig

/*
state：在 useFrame 的回調函數中，state 參數包含了與當前的渲染狀態有關的一系列資訊。
這包括對 Three.js 的 camera、scene、以及光標位置（pointer）等屬性的訪問。
你可以利用這些資訊來調整相機、場景中物件的位置或是其他渲染相關的設定。

delta：這是上一幀與當前幀之間的時間差（以秒為單位）。
這個值用於計算需要根據時間變化的動畫或物理計算，以確保動畫的平滑過渡和正確的時間控制。
無論實際幀率如何，使用 delta 可以幫助你的動畫在不同的設備和不同的幀率下表現一致。
*/