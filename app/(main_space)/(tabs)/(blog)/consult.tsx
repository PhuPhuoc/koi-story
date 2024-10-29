import { StyleSheet, Text, View } from "react-native";
import PostConsult from "../../../../components/post_consult/post_consult";
import ConsultPost from "../../../../components/post_consult/consult_card_blog";
const ConsultPage = () => {
  return (
    <View style={styles.container}>
      <ConsultPost />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  }
})
export default ConsultPage;
