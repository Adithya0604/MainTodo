import React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/taskSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  return (
    <Searchbar
      placeholder="Search tasks"
      onChangeText={(query) => dispatch(setSearchQuery(query))}
      value={searchQuery}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 8,
    elevation: 2,
  },
});

export default SearchBar;
