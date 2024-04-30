import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import CameraRig from './CameraRig';

const CanvasModel = () => {
    return (
        <Canvas
            shadows  // 啟用陰影效果
            camera={{ position: [0, 0, 0], fov: 25 }}  // 設定攝影機的位置和視角(field of view)
            gl={{ preserveDrawingBuffer: true }}  // 配置 WebGL 的設定，此處使畫面能被保存至圖片
            className="w-full max-w-full h-full transition-all ease-in"
        >
            <ambientLight />                 {/* 增加一個全域光源，提供無方向的光 */}
            <Environment preset="city" />    {/* 使用環境預設設置，此處為城市環境 */}

            <CameraRig>
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    )
}

export default CanvasModel