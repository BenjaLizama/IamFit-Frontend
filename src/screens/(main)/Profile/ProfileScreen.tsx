import { BottomSheet } from "@/src/core/components/BottomSheet";
import ActivityChart from "@/src/core/components/ActivityChart";
import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import FilterInformationBox from "@/src/core/components/FilterInformationBox";
import FilterSelector from "@/src/core/components/FilterSelector";
import MiaContextCard from "@/src/core/components/MiaContextCard";
import Wrapper from "@/src/core/components/Wrapper";
import { hp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import GorhomBottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProfileScreenStyles as styles } from "./ProfileScreen.styles";
import { PROFILE_FILTERS, useProfileScreen } from "./useProfileScreen";

export default function ProfileScreen() {
  const {
    profile,
    summary,
    activity,
    isLoading,
    isRefreshing,
    isChartLoading,
    completionPercentage,
    goalLabel,
    contextItems,
    footerLeft,
    footerRight,
    quickActions,
    contentCards,
    editField,
    editFieldLabel,
    editDraft,
    isSavingEdit,
    setEditDraft,
    handleFilterChange,
    handleRefresh,
    goToSettings,
    closeEditField,
    saveEditField,
  } = useProfileScreen();

  const editSheetRef = useRef<GorhomBottomSheet>(null);

  useEffect(() => {
    if (editField) {
      editSheetRef.current?.expand();
    } else {
      editSheetRef.current?.close();
    }
  }, [editField]);

  if (isLoading) {
    return (
      <Wrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.AZUL_PRIMARIO} />
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.headerRow}>
          <CustomText type="h2">Mi Perfil</CustomText>
          <TouchableOpacity onPress={goToSettings} activeOpacity={0.7}>
            <Ionicons
              name="settings-outline"
              size={UI.spacing.xl}
              color={COLOR.TEXTO_PRINCIPAL}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <CustomText type="h2" color={COLOR.FONDO}>
              {profile?.nickname?.charAt(0)?.toUpperCase() ?? "?"}
            </CustomText>
          </View>

          <View style={styles.profileInfo}>
            <CustomText type="h2">{profile?.nickname ?? "Usuario"}</CustomText>

            {goalLabel ? (
              <View style={styles.goalBadge}>
                <FilterInformationBox color={COLOR.AZUL_PRIMARIO}>
                  {goalLabel}
                </FilterInformationBox>
              </View>
            ) : null}

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <CustomText type="h2" size={hp(20)}>
                  {summary?.workoutsCount ?? 0}
                </CustomText>
                <CustomText type="body_secondary" size={hp(12)}>
                  Entrenos
                </CustomText>
              </View>
              <View style={styles.statItem}>
                <CustomText type="h2" size={hp(20)}>
                  {summary?.foodEntriesCount ?? 0}
                </CustomText>
                <CustomText type="body_secondary" size={hp(12)}>
                  Comidas
                </CustomText>
              </View>
              <View style={styles.statItem}>
                <CustomText type="h2" size={hp(20)}>
                  {summary?.goalsCompletedCount ?? 0}
                </CustomText>
                <CustomText type="body_secondary" size={hp(12)}>
                  Metas
                </CustomText>
              </View>
            </View>
          </View>
        </View>

        <MiaContextCard
          percentage={completionPercentage}
          items={contextItems}
          quickActions={quickActions}
          footerLeft={footerLeft}
          footerRight={footerRight}
        />

        <View style={styles.filterRow}>
          <FilterSelector
            filterList={[...PROFILE_FILTERS]}
            onFilterChange={handleFilterChange}
          />
        </View>

        {contentCards.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsCarousel}
          >
            {contentCards.map((card) => (
              <View key={card.id} style={styles.contentCard}>
                <View style={styles.contentCardIcon}>
                  <Ionicons
                    name={card.icon as never}
                    size={UI.spacing.xl}
                    color={COLOR.AZUL_PRIMARIO}
                  />
                </View>
                <CustomText type="body_secondary" style={styles.contentCardTitle}>
                  {card.title}
                </CustomText>
                <CustomText
                  type="body_secondary"
                  size={hp(12)}
                  color={COLOR.TEXTO_SECUNDARIO}
                >
                  {card.subtitle}
                </CustomText>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyCard}>
            <CustomText type="body_secondary" color={COLOR.TEXTO_SECUNDARIO}>
              Aun no tienes elementos activos en esta categoria.
            </CustomText>
          </View>
        )}

        <View style={styles.activitySection}>
          <CustomText type="body_secondary">Historial de actividad</CustomText>
          <CustomText type="h2" size={hp(18)} style={styles.activityTitle}>
            {activity?.label ?? "Sin datos disponibles"}
          </CustomText>

          {isChartLoading ? (
            <ActivityIndicator
              color={COLOR.AZUL_PRIMARIO}
              style={styles.chartLoading}
            />
          ) : (
            <ActivityChart
              points={activity?.points ?? []}
              highlight={activity?.highlight}
              unit={activity?.unit}
            />
          )}
        </View>
      </ScrollView>

      <BottomSheet ref={editSheetRef}>
        <CustomText type="h2" size={hp(20)} style={styles.sheetTitle}>
          Editar {editFieldLabel}
        </CustomText>
        <CustomText type="body_secondary" style={styles.sheetSubtitle}>
          Separa cada elemento con una coma.
        </CustomText>
        <TextInput
          value={editDraft}
          onChangeText={setEditDraft}
          placeholder="Ej: mariscos, lactosa"
          placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
          style={styles.sheetInput}
          multiline
        />
        <View style={styles.sheetActions}>
          <CustomButton
            type="secondary"
            onPress={closeEditField}
            widht={UI.spacing.giant * 2}
          >
            Cancelar
          </CustomButton>
          <CustomButton
            type="primary"
            onPress={saveEditField}
            isLoading={isSavingEdit}
            widht={UI.spacing.giant * 2}
          >
            Guardar
          </CustomButton>
        </View>
      </BottomSheet>
    </Wrapper>
  );
}
