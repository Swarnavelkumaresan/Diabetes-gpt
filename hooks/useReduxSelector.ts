import { RootState } from 'apps/source-toolkit/src/toolkit/store';
import { useSelector } from 'react-redux';

function useReduxSelector() {
  const {
    healthCare,
    userData,
    physicalActivityRecords,
    foodCaloriesTargetingTable,
    consultationRecord,
    bgReadingsData,
    bpReadingsData,
    WeightSleepData,
    postData,
    likeData,
    allPostData,
    dashboardPostData,
    fetchUserReminderData,

    // getBpReadings,
  } = useSelector((state: any) => state?.dashboard || []);

  const physicalActivityMonitoring = useSelector(
    (state: RootState) =>
      state?.dashboard?.userData?.physicalActivityMonitoring,
  );
  const userDailyTargetTable = useSelector(
    (state: RootState) => state?.dashboard?.userDailyConsumptionFoodTable,
  );

  const SelectedFoodItem = useSelector(
    (state: RootState) => state?.dashboard?.selectedFoodItem,
  );

  const consumedData = useSelector(
    (state: RootState) => state?.dashboard?.consumedFoodDataAction,
  );

  const userSelectedFoodItems = useSelector(
    (state: RootState) => state?.dashboard?.getUserSelectedFoodItem,
  );
  const overAllFoodItems = useSelector(
    (state: RootState) => state?.dashboard?.foodItem,
  );

  const filteredFoodList = (category: string) =>
    overAllFoodItems?.filter((foodItem) => foodItem.category === category) ||
    [];

  const userSelectedFoodList = (mealType: string) =>
    consumedData?.filter((foodItem) => foodItem?.mealType === mealType) || [];

  const userAcceptedFoodList = (mealType: string) => {
    return (
      consumedData
        ?.filter((foodItem) => foodItem.isAccepted === true)
        .filter((foodItem) => foodItem.mealType === mealType) || []
    );
  };
  return {
    bgReadingsData,
    bpReadingsData,
    // getBpReadings,
    WeightSleepData,
    physicalActivityRecords,
    physicalActivityMonitoring,
    userDailyTargetTable,
    SelectedFoodItem,
    consumedData,
    overAllFoodItems,
    userSelectedFoodItems,
    healthCare,
    userData,
    consultationRecord,
    foodCaloriesTargetingTable,
    postData,
    likeData,
    allPostData,
    fetchUserReminderData,
    dashboardPostData,
    filteredBreakfastList: filteredFoodList('breakfast'),
    filteredLunchList: filteredFoodList('lunch'),
    filteredDinnerList: filteredFoodList('Dinner'),
    userSelectedBreakfastList: userSelectedFoodList('breakfast'),
    userSelectedLunchList: userSelectedFoodList('lunch'),
    userSelectedDinnerList: userSelectedFoodList('Dinner'),
    userAcceptedBreakfastList: userAcceptedFoodList('breakfast'),
    userAcceptedLunchList: userAcceptedFoodList('lunch'),
    userAcceptedDinnerList: userAcceptedFoodList('Dinner'),
  };
}

export default useReduxSelector;
