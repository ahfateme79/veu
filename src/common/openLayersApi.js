import { Draw, Modify } from "ol/interaction";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import Cluster from 'ol/source/Cluster';
import VectorLayer from "ol/layer/Vector";
import Select from 'ol/interaction/Select';
import Map from "ol/Map";
import ImageWMS from "ol/source/ImageWMS";
import VectorSource from "ol/source/Vector";
// import TileWMS from 'ol/source/TileWMS';
// import XYZ from "ol/source/XYZ";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import View from "ol/View";
import * as constant from './constants';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
// import {boundingExtent} from 'ol/extent';
import Geocoder from 'ol-geocoder'
import Overlay from 'ol/Overlay';
import BingMaps from 'ol/source/BingMaps';
import { getArea, getLength } from "ol/sphere";
import { FullScreen, defaults as defaultControls } from "ol/control";

// import { useToast } from "vue-toastification";
// import { isPointInPolygon } from 'geolib';
// import {getCenter} from 'geolib';


// let toastOptions = {
//     position: 'top-right',
//     timeout: 5000,
//     closeOnClick: true,
//     pauseOnFocusLoss: true,
//     pauseOnHover: true,
//     draggable: true,
//     draggablePercent: 0.6,
//     showCloseButtonOnHover: false,
//     hideProgressBar: true,
//     closeButton: 'button',
//     icon: true,
//     rtl: true,
// }
// let toast = useToast()
export default {
    initializeMap(self, mapOptions) {
        let source = new BingMaps({
            key: constant.bingMapKey,
            imagerySet: 'AerialWithLabelsOnDemand',
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
        }),
            // let source = new XYZ({
            //     attributionsCollapsible: true,
            //     // url: constant.mapSourceUrl,
            //     url: constant.mapBingSourceUrl,
            //     maxZoom: 15,
            // }),
            view = new View({
                zoom: mapOptions.zoom ? mapOptions.zoom : 5,
                center: mapOptions.point !== null ? mapOptions.point : [53.688, 32.4279],
                constrainResolution: true,
                projection: 'EPSG:4326',
            }),
            defaultControl = defaultControls(),
            map = new Map({
                target: self.$refs["map-root"],
                layers: [new TileLayer({
                    visible: true,
                    preload: Infinity,
                    source: source
                })],
                controls: [
                    defaultControl.array_[0],
                    new FullScreen()
                ],
                view: view,
            });
        let overLay = new Overlay({
            element: self.$refs["popup-point"],
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        })
        map.addOverlay(overLay)
        self.overLay = overLay;
        self.map = map;
        self.source = source;
        if (mapOptions.hasSearchBar === true) {
            this.renderSearchbar(self)
        }
    },
    renderSearchbar(self) {
        let seachTitle = 'جستجو موقعیت مکانی';
        const geocoder = new Geocoder('nominatim', {
            provider: 'osm',
            targetType: 'text-input',
            lang: 'fa',
            placeholder: seachTitle,
            limit: 5,
            keepOpen: false,
            featureStyle: new Style({
                fill: new Fill({ textAlign: 'right' }),
            })
        });
        self.map.addControl(geocoder);
        document.getElementById("gcd-container").style.zIndex = "100"
        document.getElementById("gcd-container").style.right = "60%"
        document.getElementById("gcd-input-query").style.textAlign = "right"
        document.getElementsByClassName("gcd-txt-result")[0].style.direction = "rtl"
        document.getElementById("gcd-input-query").style.direction = "rtl";
        document.getElementsByClassName("gcd-txt-control")[0].style.borderRadius = "10px"

    },
    drawShapeOnMap(self) {
        let draw = null,
            map = self.map,
            overLay = self.overLay,
            source = new VectorSource(),
            vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({ color: "rgba(0, 0,0, 0.9)" }),
                    stroke: new Stroke({
                        color: "rgba(0, 0,0, 0.9)", width: 2, lineDash: [8, 6],
                        lineDashOffset: 4
                    }),
                    // image: new CircleStyle({ radius: 15, fill: new Fill({ color: "#000000" }) }),
                }),
            });
        let projectionPerunit = map.getView().getProjection().metersPerUnit_;

        draw = new Draw({
            source: source, type: 'Polygon',
            style: new Style({
                image: new CircleStyle({ radius: 5, fill: new Fill({ color: "#000000" }) }),
                stroke: new Stroke({
                    color: "rgba(0, 0,0, 0.9)", width: 2, lineDash: [8, 6],
                    lineDashOffset: 4
                })
            })
        });
        map.addInteraction(draw);
        self.draw = draw;
        self.source = source;
        // draw.on("drawstart", function (e) {
        //     let latLon = e.feature.getGeometry().getCoordinates()
        //     let latLogObj = {
        //         latitude: latLon[0][0][0],
        //         longitude: latLon[0][0][1]
        //     }
        //     let farmLatLon = []
        //     if (farmPolygon !== undefined && farmPolygon[0] !== undefined) {
        //         farmPolygon[0].map(item => {
        //             let obj = {}
        //             obj.latitude = item[0]
        //             obj.longitude = item[1]
        //             farmLatLon.push(obj)
        //         })
        //         if (!isPointInPolygon(latLogObj, farmLatLon)) {
        //             toast.error('خارج از محدوده مزرعه امکان ثبت گیاه وجود ندارد', toastOptions)
        //             map.removeInteraction(self.draw)
        //         }
        //     }
        // });


        draw.on("drawend", function (evt) {
            let feature = evt.feature,
                geometry = feature.getGeometry(),
                shapeValue = getArea(geometry) * (projectionPerunit * projectionPerunit),
                output = "";
            if (shapeValue > 10000) {
                output =
                    (Math.round((shapeValue / 1000000) * 100) / 100) * 100 + " " + "هکتار";
            } else {
                output = Math.round(shapeValue * 100) / 100 + " " + "مترمربع";
            }
            self.featureID = self.featureID + 1;
            self.polygonArray = geometry.getCoordinates();
            self.polygonArea = output;
            self.overlayValue = output;
            feature.setProperties({ id: self.featureID });
            map.removeInteraction(map.getInteractions().pop());
            overLay.setPosition(geometry.getCoordinates()[0][0]);

        });
        map.addLayer(vector);
    },
    drawLineOnMap(self) {
        let draw = null,
            map = self.map,
            source = new VectorSource(),
            overLay = self.overLay,
            vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({ color: "rgba(255, 192, 116, 0.8)" }),
                    stroke: new Stroke({ color: "#FCE7CD", width: 4 }),
                    image: new CircleStyle({ radius: 15, fill: new Fill({ color: "#000000" }) }),
                }),
            });
        let projectionPerunit = self.map.getView().getProjection().metersPerUnit_;

        draw = new Draw({ source: source, type: 'LineString' });
        map.addInteraction(draw);
        self.draw = draw;
        self.source = source;
        draw.on("drawend", function (evt) {
            let feature = evt.feature,
                geometry = feature.getGeometry(),
                shapeValue = getLength(geometry) * projectionPerunit,
                output = "";
            if (shapeValue > 100) {
                output = Math.round((shapeValue / 1000) * 100) / 100 + " " + "km";
            } else {
                output = Math.round(shapeValue * 100) / 100 + " " + "m";
            }
            self.featureID = self.featureID + 1;
            self.lineArray = geometry.getCoordinates();
            self.mapLineForm = true;
            self.lineLength = output;
            self.overlayValue = output;
            feature.setProperties({ id: self.featureID });
            map.removeInteraction(map.getInteractions().pop());
            overLay.setPosition(geometry.getCoordinates()[0]);
        });
        map.addLayer(vector);
    },
    modifyShapeOnMap(self, id, type) {
        let select_shape = null,
            modify_shape = null;
        let selected = null;
        self.map.on("click", function (e) {
            if (selected !== null) {
                selected = null;
            }
            self.map.forEachFeatureAtPixel(e.pixel, function (f) {
                selected = f;
                self.vectorValue = selected;
                return true;
            });
            if (selected) {
                self.vectorValue = selected;
            } else {
                self.vectorValue = null;
            }
        });
        if (self.vectorValue !== null && self.vectorValue.getProperties().name === id) {
            select_shape = new Select({
                style: new Style({
                    image: new CircleStyle({ radius: 5, fill: new Fill({ color: "#00A57A" }) }),
                    fill: new Fill({ color: "rgba(60, 179, 113, 0.8)" }),
                    stroke: new Stroke({
                        color: "rgba(0, 0,0, 0.9)", width: 2, lineDash: [8, 6],
                        lineDashOffset: 4
                    })
                })
            });
            self.map.addInteraction(select_shape);
            modify_shape = new Modify({ features: select_shape.getFeatures() });
            self.select_shape = select_shape;
            self.modify_shape = modify_shape;
            self.map.addInteraction(modify_shape);
            modify_shape.on("modifyend", function (evt) {
                let feature = evt.target.features_.array_[0];
                let geometry = feature.getGeometry().getCoordinates();
                if (type === 'Polygon') {
                    self.finalPolygonArray = []
                    self.polygonArray = geometry
                } else {
                    self.lineArray = geometry
                }

                self.vectorValue = null
            });
        } else {
            self.map.removeInteraction(self.modify_shape);
            self.map.removeInteraction(self.select_shape);
            self.select_shape = null;
            self.modify_shape = null;
            selected = null;
            select_shape = null;
            modify_shape = null

        }
    },
    deleteShapeOnMap(self, type) {
        if (type === 'polygon') {
            self.polygonArray = []
        } else {
            self.lineArray = []
        }
        let source = self.source
        console.log(source);
        let map = self.map
        let draw = self.draw
        let selectedFeatureID = 0;
        let features = source.getFeatures();
        if (features != null && features.length > 0) {
            features.map((item) => {
                if (item.values_.id == selectedFeatureID) {
                    return source.removeFeature(item);
                }
            });
        }
        map.removeInteraction(draw);
        source.clear();
        self.overLay.setPosition(undefined)

    },
    drawSingleFeature(coordinate, center, isPlant) {
        let source = new VectorSource(),
            vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({ color: isPlant === true ? "rgba(250, 250, 250, 0)" : "#fff" }),
                    stroke: new Stroke({ color: isPlant === true ? "#00A57A" : "#fff", width: 2 }),
                    image: new CircleStyle({ radius: 15, fill: new Fill({ color: "#00A57A" }) }),
                }),
                opacity: isPlant === true ? 1 : .5,
            });
        let feature = new Feature({
            geometry: new Polygon(coordinate),
            labelPoint: new Point(center),
            name: 'My Polygon'
        });
        source.addFeature(feature);
        // self.source = source;
        vector.setProperties({ name: 'sectionLayer' }, true);
        this.map.addLayer(vector);
    },
    drawFeature(coordinate, center, isPlant, id, editColor, editCenetr) {
        let source = new VectorSource(),
            vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({ color: isPlant === true ? editColor : "#fff" }),
                    stroke: new Stroke({ color: isPlant === true ? editColor : "#fff", width: 2 }),
                    image: new CircleStyle({ radius: 15, fill: new Fill({ color: "#00A57A" }) }),
                }),
                opacity: isPlant === true ? 1 : .5,
            });
        let feature = new Feature({
            geometry: new Polygon(coordinate),
            labelPoint: new Point(center),
            name: id
        });
        source.addFeature(feature);
        vector.setProperties({ name: id }, true);
        this.mapFeatures.push(source.getFeatures())
        if (editCenetr !== undefined && editCenetr !== null) {
            this.source = source;
            this.overLay.setPosition(editCenetr);
            this.overlayValue = `قطعه قابل ویرایش 
            کلیک کنید`
            let select_shape = new Select({
                style: new Style({
                    image: new CircleStyle({ radius: 5, fill: new Fill({ color: "#000000" }) }),
                    fill: new Fill({ color: isPlant === true ? editColor : "#fff" }),

                    stroke: new Stroke({
                        color: "rgba(0, 0,0, 0.9)", width: 2, lineDash: [8, 6],
                        lineDashOffset: 4
                    })
                })
            });
            select_shape.getFeatures().push(feature)
            this.map.addInteraction(select_shape);
            this.select_shape = select_shape;
        }
        this.map.addLayer(vector);
    },
    drawLineFeature(coordinate, id, isLine, editColor, editCenetr) {
        let source = new VectorSource(),
            vector = new VectorLayer({
                source: source,
                style: new Style({
                    fill: new Fill({ color: isLine === true ? editColor : "rgba(250, 250, 250, 0)" }),
                    stroke: new Stroke({ color: isLine === true ? editColor : "#fff", width: 4 }),
                    image: new CircleStyle({ radius: 15, fill: new Fill({ color: "#00A57A" }) }),
                }),
                opacity: 0.5,
            });
        let feature = new Feature({
            geometry: new LineString(coordinate),
            name: id
        });
        source.addFeature(feature);
        if (editCenetr !== undefined && editCenetr !== null) {
            this.source = source;

            this.source = source;
            this.overLay.setPosition(editCenetr);
            this.overlayValue = `ردیف قابل ویرایش 
            کلیک کنید`
            let select_shape = new Select({
                style: new Style({
                    image: new CircleStyle({ radius: 5, fill: new Fill({ color: "#000000" }) }),
                    fill: new Fill({ color: isLine === true ? editColor : "#fff" }),

                    stroke: new Stroke({
                        color: "rgba(0, 0,0, 0.9)", width: 2, lineDash: [8, 6],
                        lineDashOffset: 4
                    })
                })
            });
            select_shape.getFeatures().push(feature)
            this.map.addInteraction(select_shape);
            this.select_shape = select_shape;
        }
        vector.setProperties({ name: 'lineLayer' }, true);
        this.map.addLayer(vector);

    },
    addImageLayerOnMap(url, self, params) {
        let map = self.map;
        let mapLayers = map.getLayers().array_;
        if (map.getLayers().array_.length > 1) map.removeLayer(mapLayers[1]);
        let imageLayer = new ImageLayer({
            source: new ImageWMS({
                url: url,
                params: {
                    LAYERS: params !== null ? params[0] : '',
                    STYLES: params !== null ? params[1] : '',
                },
                ratio: 1,
                serverType: 'geoserver',
            }),
        });
        map.addLayer(imageLayer)
    },
    addLayer(url, self, params) {
        let map = self.map;
        let mapLayers = map.getLayers().array_;
        mapLayers.map((item, index) => {
            if (item.getProperties().name === 'analysisLayer') {
                map.removeLayer(mapLayers[index])
            }
        })
        let imageLayer = new ImageLayer({
            source: new ImageWMS({
                url: url,
                params: {
                    LAYERS: params !== null ? params[0] : '',
                    STYLES: params !== null ? params[1] : '',
                },
                ratio: 1,
                serverType: 'geoserver',
            }),
        });
        imageLayer.setProperties({ name: 'analysisLayer' }, true);
        map.addLayer(imageLayer)
    },
    removeLayer(self, layer) {
        let map = self.map;
        // let removeIndex = [];
        let mapLayers = map.getLayers().array_;
        if (layer.id === 4) self.overLay.setPosition(undefined);
        if (mapLayers.length > 0) {
            if (layer.id === 3) {
                map.getLayers().getArray().slice().forEach((item) => {
                    if (item.getProperties().name !== undefined) {
                        if (item.getProperties().name === layer.value) {
                            item.getSource().clear();
                            map.removeLayer(item);
                        }
                    }
                })
            } else {
                mapLayers.map((item, index) => {
                    console.log(item.getProperties().name)
                    if (item.getProperties().name === layer.value) {
                        map.removeLayer(mapLayers[index])
                    }
                })

            }
        }

    },
    showPoints(self, layer) {
        console.log(layer)
        const count = self.gardenTreesLength;
        const features = new Array(count);
        for (let i = 0; i < count; ++i) {
            features[i] = new Feature({ geometry: new Point(self.gardenTrees[i].location.coordinates), name: self.gardenTrees[i].name });
        }
        const source = new VectorSource({
            features: features,
        });
        const clusterSource = new Cluster({
            distance: parseInt(40, 10),
            minDistance: parseInt(20, 10),
            source: source,
        });
        const styleCache = {};
        const clusters = new VectorLayer({
            source: clusterSource,
            style: function (feature) {
                const size = feature.get('features').length;
                let style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#333',
                                width: 2
                            }),
                            fill: new Fill({
                                color: 'rgba(250, 250, 250, 0)',
                            }),
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#333',
                            }),
                            font: 'bold 10px iranyekan'
                        }),
                    });
                    styleCache[size] = style;
                }
                return style;
            },
        });
        clusters.setProperties({ name: 'treeLayer' }, true);
        self.clusters = clusters;
        self.map.addLayer(clusters)
    },
    getPointsValue(self, layer) {
        console.log(layer)
        self.map.on('click', (e) => {
            console.log(e)
            self.clusters.getFeatures(e.pixel).then((clickedFeatures) => {
                console.log(clickedFeatures)
                if (clickedFeatures.length) {
                    const features = clickedFeatures[0].get('features');
                    if (features.length === 1) {
                        self.pointValue = features[0].values_.name
                        self.overLay.setPosition(features[0].values_.geometry.getCoordinates());
                        // features[0].values_.name
                        //   const extent = boundingExtent(
                        //     features.map((r) => r.getGeometry().getCoordinates())
                        //   );
                        //   self.map.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
                    }
                }
            });
        });
    },

}