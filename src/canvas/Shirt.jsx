import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';  // useFrame hook，用於創建動畫循環
import { easing } from 'maath';  // 從 maath 庫中引入 easing 工具，用於平滑過渡
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import glb from '../assets/shirt_baked.glb';

import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF(glb);  // 從 GLB 檔案加載3D模型和材質

    const logoTexture = useTexture(snap.logoDecal);  // 加載用戶選擇的標誌貼圖(DataUrl)
    const fullTexture = useTexture(snap.fullDecal);  // 加載用戶選擇的全身貼圖(DataUrl)

    // 在每一幀中更新材質的顏色來匹配全局狀態中指定的顏色
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    const stateString = JSON.stringify(snap);  // 將全局狀態轉換為字符串，用於觸發重新渲染

    return (
        <group key={stateString}>  {/* 使用 stateString 為 key 來確保在狀態改變時可以重新渲染 */}
            <mesh
                castShadow  // 允許投射陰影
                geometry={nodes.T_Shirt_male.geometry}  // 使用加載的 T恤模型的幾何體
                material={materials.lambert1}  // 使用加載的材質
                materialRoughness={1}  // 設置材質的粗糙度
                dispose={null}  // 禁用自動清理資源
            >
                {snap.isFullTexture && (  // 如果啟用全身貼圖
                    <Decal
                        position={[0, 0, 0]}  // 貼圖位置
                        rotation={[0, 0, 0]}  // 貼圖旋轉
                        scale={1}  // 貼圖縮放
                        map={fullTexture}  // 指定貼圖
                    />
                )}

                {snap.isLogoTexture && (  // 如果啟用標誌貼圖
                    <Decal
                        position={[0, 0.04, 0.15]}  // 貼圖位置
                        rotation={[0, 0, 0]}  // 貼圖旋轉
                        scale={0.15}  // 貼圖縮放
                        map={logoTexture}  // 指定貼圖
                        mapAnisotropy={16}  // 貼圖的各向異性過濾設定
                        depthTest={false}  // 深度測試
                        depthWrite={true}  // 深度寫入
                    />
                )}
            </mesh>
        </group>
    )
}

export default Shirt;
