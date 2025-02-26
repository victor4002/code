import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { ORS_API_KEY } from "@env";

const App = () => {
  const [chargingStations, setChargingStations] = useState([]);
  const [mapError, setMapError] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [centerPoint, setCenterPoint] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });

  // Fetch EV Charging Stations from new API endpoint
  const fetchChargingStations = async () => {
    const url = "https://ev-charging-api.onrender.com/api/stations/";

    try {
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.length > 0) {
          setChargingStations(data);
          setMapError(null); // Clear any previous error
        } else {
          console.error("No charging stations found.");
          setMapError("No charging stations found in this location.");
        }
      } else {
        console.error("Received non-JSON response");
        setMapError("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error fetching charging stations:", error);
      setMapError("Error fetching charging stations: " + error.message);
    }
  };

  // Search location and update map using OpenRouteService
  const handleSearch = async () => {
    const geocodeUrl = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${searchLocation}, Lagos, Nigeria`;

    try {
      const response = await fetch(geocodeUrl);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const { coordinates } = data.features[0].geometry;
          setCenterPoint({
            latitude: coordinates[1],
            longitude: coordinates[0],
          });
          fetchChargingStations(); // Refresh stations
        } else {
          setMapError("No location found.");
        }
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      setMapError("Error fetching geocode data: " + error.message);
    }
  };

  useEffect(() => {
    const defaultLocation = "Lagos"; // Default location to search for
    setSearchLocation(defaultLocation);
    setTimeout(async () => {
      await handleSearch();
      await fetchChargingStations(); // Fetch and display stations on load
    }, 0);
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter place in Lagos"
          value={searchLocation}
          onChangeText={setSearchLocation}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      {mapError ? (
        <Text style={styles.errorText}>Error: {mapError}</Text>
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: centerPoint.latitude,
            longitude: centerPoint.longitude,
            latitudeDelta: 0.1, // Zoom level for a closer view
            longitudeDelta: 0.1,
          }}
        >
          {/* Charging Stations Markers */}
          {chargingStations.map((station, index) => (
            <Marker
              key={station._id || index}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.station_name}
              description={station.address}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <View style={styles.calloutBubble}>
                    <View style={styles.calloutHeader}>
                      <Image
                        source={{ uri: station.photos }}
                        style={styles.calloutImage}
                      />
                      <Text style={styles.calloutTitle}>
                        {station.station_name}
                      </Text>
                    </View>
                    <Text style={styles.calloutText}>
                      Address: {station.address}
                    </Text>
                    <Text style={styles.calloutText}>
                      Operator: {station.operator}
                    </Text>
                    <Text style={styles.calloutText}>
                      Chargers: {station.number_of_chargers}
                    </Text>
                    <Text style={styles.calloutText}>
                      Connector Type: {station.connector_type}
                    </Text>
                    <Text style={styles.calloutText}>
                      Speed: {station.charging_speed} kW
                    </Text>
                    <Text style={styles.calloutText}>
                      Availability: {station.availability}
                    </Text>
                    <Text style={styles.calloutText}>
                      Hours: {station.operating_hours}
                    </Text>
                    <Text style={styles.calloutText}>
                      Pricing: {station.pricing} NGN
                    </Text>
                    <Text style={styles.calloutText}>
                      Payment: {station.payment_methods}
                    </Text>
                  </View>
                  <View style={styles.calloutArrow} />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by KrisBethel API</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  calloutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  calloutBubble: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 200,
    maxWidth: 400,
  },
  calloutHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  calloutImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calloutText: {
    fontSize: 14,
    marginBottom: 2,
  },
  calloutArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    alignSelf: "center",
    marginTop: -1,
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    position: "absolute",
    top: 70,
    left: "5%",
    right: "5%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "#87CEEB",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    backgroundColor: "#87CEEB",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
  },
});

export default App;
String.prototype.includes = function (searchString: string): boolean {
  return this.indexOf(searchString) !== -1;
};
function includes(arg0: string) {
  throw new Error("Function not implemented.");
}

