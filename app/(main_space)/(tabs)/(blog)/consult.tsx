import { StyleSheet, Text, View } from "react-native";
import PostConsult from "../../../../components/post_consult/post_consult";
import ConsultCard from "../../../../components/post_consult_v2/consult_card";
const ConsultPage = () => {
  return (
    <View style={styles.container}>
      <ConsultCard />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  }
})
export default ConsultPage;
