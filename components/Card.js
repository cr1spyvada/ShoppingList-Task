import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const Card = ({ items }) => {
  return (
    <View style={tw`border w-full my-0.2 py-1 bg-blue-100`}>
      {/* {console.log(items, " items")} */}
      <Text style={tw`text-lg`}>{items.name}</Text>
    </View>
  );
};

export default Card;
