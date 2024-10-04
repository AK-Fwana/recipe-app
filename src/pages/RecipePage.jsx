import { Box, Button, Heading, Image, Text, Stack } from "@chakra-ui/react";

export const RecipePage = ({ selectedRecipe, setSelectedRecipe }) => {
  const {
    label,
    image,
    mealType,
    dishType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servings,
    totalNutrients,
  } = selectedRecipe;

  return (
    <Box p="4" maxWidth="800px" mx="auto">
      {/* Recipe Name */}
      <Heading mb="4">{label}</Heading>

      {/* Recipe Image */}
      <Image src={image} alt={label} borderRadius="md" mb="4" />

      {/* Meal Type */}
      {mealType && (
        <Text mb="2">
          <strong>Meal Type:</strong> {mealType.join(", ")}
        </Text>
      )}

      {/* Dish Type */}
      {dishType && (
        <Text mb="2">
          <strong>Dish Type:</strong> {dishType.join(", ")}
        </Text>
      )}

      {/* Total Cooking Time */}
      <Text mb="2">
        <strong>Total Cooking Time:</strong>{" "}
        {totalTime > 0 ? `${totalTime} minutes` : "Not specified"}
      </Text>

      {/* Diet Labels */}
      {dietLabels && dietLabels.length > 0 && (
        <Text mb="2">
          <strong>Diet Labels:</strong> {dietLabels.join(", ")}
        </Text>
      )}

      {/* Health Labels */}
      {healthLabels && healthLabels.length > 0 && (
        <Text mb="2">
          <strong>Health Labels:</strong> {healthLabels.join(", ")}
        </Text>
      )}

      {/* Cautions */}
      {cautions && cautions.length > 0 && (
        <Text mb="2">
          <strong>Cautions:</strong> {cautions.join(", ")}
        </Text>
      )}

      {/* Ingredients */}
      <Box mb="4">
        <Heading size="md" mb="2">
          Ingredients
        </Heading>
        <Stack spacing={1}>
          {ingredientLines.map((ingredient, index) => (
            <Text key={index}>- {ingredient}</Text>
          ))}
        </Stack>
      </Box>

      {/* Servings */}
      <Text mb="4">
        <strong>Servings:</strong> {servings}
      </Text>

      {/* Total Nutrients */}
      <Box mb="4">
        <Heading size="md" mb="2">
          Nutritional Information
        </Heading>
        <Text>
          <strong>Energy:</strong>{" "}
          {totalNutrients.ENERC_KCAL?.quantity.toFixed(2)}{" "}
          {totalNutrients.ENERC_KCAL?.unit}
        </Text>
        <Text>
          <strong>Protein:</strong> {totalNutrients.PROCNT?.quantity.toFixed(2)}{" "}
          {totalNutrients.PROCNT?.unit}
        </Text>
        <Text>
          <strong>Fat:</strong> {totalNutrients.FAT?.quantity.toFixed(2)}{" "}
          {totalNutrients.FAT?.unit}
        </Text>
        <Text>
          <strong>Carbohydrates:</strong>{" "}
          {totalNutrients.CHOCDF?.quantity.toFixed(2)}{" "}
          {totalNutrients.CHOCDF?.unit}
        </Text>
        <Text>
          <strong>Cholesterol:</strong>{" "}
          {totalNutrients.CHOLE?.quantity.toFixed(2)}{" "}
          {totalNutrients.CHOLE?.unit}
        </Text>
        <Text>
          <strong>Sodium:</strong> {totalNutrients.NA?.quantity.toFixed(2)}{" "}
          {totalNutrients.NA?.unit}
        </Text>
      </Box>

      {/* Back Button */}
      <Button mt="4" onClick={() => setSelectedRecipe(null)}>
        Back to Recipes
      </Button>
    </Box>
  );
};
