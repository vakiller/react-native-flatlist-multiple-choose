import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Platform, Image } from 'react-native';
import Checkbox from './Checkbox';
export const FlatlistMultipleChoose = (props) => {
    const [choosedList, setChoosedList] = useState([]);
    const [customList, setCustomList] = useState([]);
    const [dataList, setDataList] = useState(props.data);
    const [choosedAll, setChoosedAll] = useState(false);
    const [checkedBackground, setCheckedBackground] = useState(props.checkedBackgroundColor ? props.checkedBackgroundColor : '#F3F9FF');
    const [unCheckedBackground, setUnCheckedBackground] = useState(props.unCheckedBackgroundColor ? props.unCheckedBackgroundColor : '#ffff');
    const [SelectAllTitle, setSelectAllTitle] = useState(props.selectAllText ? props.selectAllText : 'Select All');
    useEffect(() => {
        if(props.data === [])
        {
            setChoosedAll(false);
        }
        setDataList(props.data);
    }, [props.data]);
    useEffect(() => {
        if (dataList) {
            let dataListNow = dataList;
            dataListNow.map((item) => {
                item.checked = false
            });
            setCustomList(dataListNow)
        }
    }, [dataList]);
    const onPressItem = (id) => {
        let customListNow = [...customList];
        for (const item in customListNow) {
            if (customListNow[item].id === id) {
                if (customListNow[item].checked === false) {
                    customListNow[item].checked = true;
                    let itemChoosed = customListNow[item];
                    if ([...choosedList, itemChoosed].length === customListNow.length) {
                        setChoosedAll(true);
                    }
                    else {
                        setChoosedAll(false);
                    }
                    setChoosedList([...choosedList, itemChoosed]);
                }
                else {
                    customListNow[item].checked = false;
                    let choosedListNow = choosedList.filter((item) => item.id !== id);
                    if (choosedListNow.length === customListNow.length) {
                        setChoosedAll(true);
                    }
                    else {
                        setChoosedAll(false);
                    }
                    setChoosedList(choosedListNow)
                }
            }
        }
        setCustomList(customListNow);
    };
    useEffect(() => {
        props.onChangeDatasChoosed(choosedList);
    }, [choosedList]);
    const renderSelectItem = (item, id) => {
        console.log("ITEM IN FLATLIST ", item);
        return (
            <View style={item.item.checked ? { backgroundColor: checkedBackground } : { backgroundColor: unCheckedBackground }} >
                <View style={props.itemStyle ? props.itemStyle : { marginTop: 10, marginBottom: 10, borderColor: '#f3f3f3', borderWidth: 0.5 }} >
                    <TouchableOpacity onPress={() => onPressItem(item.item.id)} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }} >
                        <View style={{ borderRadius: 1, borderColor: 'black' }} >
                            {
                                <Checkbox
                                    onClick={() => onPressItem(item.item.id)}
                                    checkedCheckBoxColor={props.checkedColor ? props.checkedColor : 'red'}
                                    uncheckedCheckBoxColor={'black'}
                                    // checkBoxColor={'red'}
                                    isChecked={item.item.checked}
                                />

                            }
                        </View>
                        {React.cloneElement(props.customItem, item.item)}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const onChoosedAll = () => {
        if (choosedAll === false) {
            let customListNow = customList;
            let choosedListNow = [];
            customListNow.map((item) => {
                item.checked = true;
                choosedListNow = [...choosedListNow, item];
            });
            setCustomList(customListNow);
            setChoosedList(choosedListNow);
            setChoosedAll(true);
        }
        else {
            let customListNow = customList;
            let choosedListNow = [];
            setChoosedList(choosedListNow);
            customListNow.map((item) => {
                item.checked = false;
            });
            setCustomList(customListNow);

            setChoosedAll(false);
        }
    };
    return (
        <View style={props.listStyle} >
            <TouchableOpacity style={props.itemStyle} onPress={() => onChoosedAll()} >

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }} >

                    <Checkbox
                        checkedCheckBoxColor={props.checkedColor ? props.checkedColor : 'red'}
                        uncheckedCheckBoxColor={'black'}
                        onClick={() => onChoosedAll()}
                        isChecked={choosedAll}
                    />


                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 14 }} >{SelectAllTitle}</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                keyExtractor={(item,index) => index.toString()}
                extraData={props.extraData}
                data={customList}
                renderItem={(item, id) => renderSelectItem(item, id)}
            />
        </View>
    );
};