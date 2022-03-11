import React, { useState } from 'react'
import { StyleSheet, View, Button,FlatList } from 'react-native';
import GoalItem from './component/GoalItem';
import GoalInput from './component/GoalInput';


export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false);
  //console.log(courseGoals)

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle}
    ])

  setIsAddMode(false)
  }

  const cancelAddGoalHandler = () => {
    setIsAddMode(false)
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput 
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelAddGoalHandler}
      />
      <FlatList
        keyExtractor={(item, idex) => item.id}
        data={courseGoals}
        renderItem={itemData => 
          <GoalItem 
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding: 50
  },
});
