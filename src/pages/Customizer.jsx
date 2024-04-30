import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
    const snap = useSnapshot(state);  // 獲取狀態快照

    const [file, setFile] = useState('');  // 管理文件的狀態

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })

    // 點擊後再右側出現操作框 (不點擊為無)
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />  // 顏色選擇器組件
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}    // logo or full
                />  // 文件選擇器組件
            default:
                return null;  // 無匹配標籤時不顯示
        }
    }

    // 處理貼花圖案的選擇
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];  // [logo or full]

        state[decalType.stateProperty] = result;  // 把 result (DataURL) 存入state [logoDecal or fullDecal]

        if (!activeFilterTab[decalType.filterTab]) {  // [logoShirt or stylishShirt]
            handleActiveFilterTab(decalType.filterTab)  // 更新活躍的篩選標籤
        }
    }

    // 處理活躍篩選標籤的變更
    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];  // store/state toggle 更新 global state
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }
        setActiveFilterTab((prevState) => {  // 更新 state
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    // 讀取文件
    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);  // 處理貼花
                setActiveEditorTab("");  // 重置編輯標籤
            })
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="回首頁"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer