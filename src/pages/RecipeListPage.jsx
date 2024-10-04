import { useState } from "react";
import {
  Center,
  Heading,
  Box,
  Image,
  Text,
  Input,
  SimpleGrid,
  Button,
  HStack,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ setSelectedRecipe }) => {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to manage dietary filters (vegan, vegetarian, pescetarian)
  const [selectedFilters, setSelectedFilters] = useState({
    vegan: false,
    vegetarian: false,
    pescetarian: false,
  });

  // Handle filter button clicks
  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  // Filter recipes based on the search query and selected dietary filters
  const filteredRecipes = data.hits.filter((hit) => {
    const recipe = hit.recipe;
    const query = searchQuery.toLowerCase();

    // Check if the recipe label includes the search query (case-insensitive)
    const matchesName = recipe.label.toLowerCase().includes(query);

    // Check if the recipe matches any of the active filters
    let matchesFilters = true;

    if (selectedFilters.vegan) {
      matchesFilters = matchesFilters && recipe.healthLabels.includes("Vegan");
    }
    if (selectedFilters.vegetarian) {
      matchesFilters =
        matchesFilters && recipe.healthLabels.includes("Vegetarian");
    }
    if (selectedFilters.pescetarian) {
      matchesFilters =
        matchesFilters && recipe.healthLabels.includes("Pescatarian");
    }

    // Return true if the recipe matches both the search query and dietary filters
    return matchesName && matchesFilters;
  });

  return (
    <Center p="4" flexDir="column">
      <Heading mb="6" textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
        Your Recipe App
      </Heading>

      {/* Search Input Field */}
      <Input
        placeholder="Search by recipe name or health label..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb="6"
        width="90%"
        maxWidth="600px"
        size="lg"
        borderRadius="lg"
      />

      {/* Dietary Filter Buttons */}
      <HStack spacing="4" mb="8">
        <Button
          colorScheme={selectedFilters.vegan ? "teal" : "gray"}
          variant={selectedFilters.vegan ? "solid" : "outline"}
          onClick={() => toggleFilter("vegan")}
        >
          Vegan
        </Button>
        <Button
          colorScheme={selectedFilters.vegetarian ? "teal" : "gray"}
          variant={selectedFilters.vegetarian ? "solid" : "outline"}
          onClick={() => toggleFilter("vegetarian")}
        >
          Vegetarian
        </Button>
        <Button
          colorScheme={selectedFilters.pescetarian ? "teal" : "gray"}
          variant={selectedFilters.pescetarian ? "solid" : "outline"}
          onClick={() => toggleFilter("pescetarian")}
        >
          Pescetarian
        </Button>
      </HStack>

      {/* Recipe List */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing="6"
        width="100%"
        maxWidth="1200px"
      >
        {filteredRecipes.map((hit) => {
          const recipe = hit.recipe;
          return (
            <Box
              key={recipe.label}
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              boxShadow="lg"
              cursor="pointer"
              transition="transform 0.2s ease"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
              onClick={() => setSelectedRecipe(recipe)}
              bg="white"
            >
              {/* Recipe Name */}
              <Heading size="md" noOfLines={1} mb="4">
                {recipe.label}
              </Heading>

              {/* Recipe Image */}
              <Image
                src={recipe.image}
                alt={recipe.label}
                borderRadius="md"
                objectFit="cover"
                width="100%"
                height="200px"
              />

              {/* Diet Labels */}
              {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                <Text mt="2" color="gray.600">
                  <strong>Diet Labels:</strong> {recipe.dietLabels.join(", ")}
                </Text>
              )}

              {/* Meal Type */}
              {recipe.mealType && (
                <Text mt="2" color="gray.600">
                  <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
                </Text>
              )}

              {/* Health Labels - Vegan and Vegetarian */}
              <Box mt="2" color="teal.600">
                {recipe.healthLabels.includes("Vegan") && (
                  <Text>
                    <strong>Health Label:</strong> Vegan
                  </Text>
                )}
                {recipe.healthLabels.includes("Vegetarian") && (
                  <Text>
                    <strong>Health Label:</strong> Vegetarian
                  </Text>
                )}
              </Box>
            </Box>
          );
        })}

        {/* If no recipes match the search query or filters */}
        {filteredRecipes.length === 0 && (
          <Text mt="4" color="red.500" textAlign="center">
            No recipes found matching your criteria.
          </Text>
        )}
      </SimpleGrid>
    </Center>
  );
};
