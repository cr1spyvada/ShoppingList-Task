import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import Card from "./components/Card";
import randomwords from "random-words";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [cardList, setCardlist] = useState([]);
  const [searchList, setSearchlist] = useState(cardList);
  function searchBar(event) {
    setSearchText(event);
    if (event === "") {
      setSearchlist(cardList);
      return;
    }
    const newList = cardList.filter((item) => {
      return item.name.toLowerCase().includes(event.toLowerCase());
    });
    setSearchlist(newList);
  }

  function addItem() {
    let word = { name: randomwords() };
    setCardlist([word, ...cardList]);
    setSearchText("");
    searchBar("");
  }
  function removeItem() {
    const newList = cardList.filter((item) => {
      if (!item.name.toLowerCase().includes(searchText)) return true;
      else return false;
    });
    setCardlist(newList);
  }
  useEffect(() => {
    setSearchlist(cardList);
  }, [cardList]);

  return (
    <View style={[tw`bg-green-100`, { height: "100%" }]}>
      <StatusBar backgroundColor="#fff" translucent={false} />
      <View style={tw`flex-row bg-green-300 `}>
        <TextInput
          style={tw`bg-white flex-1 m-1 border`}
          value={searchText}
          onChangeText={searchBar}
        />
        <TouchableOpacity onPress={removeItem} style={[tw``, { width: "10%" }]}>
          <View style={tw`h-10`}>
            <Icon name="minus" style={tw`text-2xl mx-auto`} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addItem} style={[tw``, { width: "10%" }]}>
          <View style={tw`h-10`}>
            <Icon name="plus" style={tw`text-2xl mx-auto`} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          renderItem={({ item }) => <Card items={item} />}
          data={searchList}
        />
      </View>
    </View>
  );
}
