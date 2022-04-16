import openLayersApi from "../common/openLayersApi";
import { getCenter, isPointInPolygon } from 'geolib';
import { useToast } from "vue-toastification";


export const mapMixin = {
    data() {
        return {
            map: null,
            source: null,
            draw: null,
            featureID: 0,
            polygonArray: [],
            polygonCenter: null,
            finalPolygonArray: [],
            lineArray: [],
            finalLineArray: [],
            mapLineForm:false,
            select_shape: null,
            modify_shape: null,
            clusters: [],
            pointValue: '',
            overLay: null,
            toastOptions: {
                position: 'top-right',
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: 'button',
                icon: true,
                rtl: true,
            },
            toast: useToast(),
            mapFeatures: [],
            vectorValue: null,
            polygonArea: '',
            lineLength: '',
            overlayValue: ''
        }
    },
    methods: {
        ...openLayersApi,
        loadMap(mapOptions) {
            this.initializeMap(this, mapOptions);
        },
        formatLocationData() {
            let polygonArray = [];
            let polygonCenter = this.getPolygonCenter(this.polygonArray[0])
            this.polygonArray[0].map(item => polygonArray.push({
                'lng': item[0],
                'lat': item[1]
            })
            )
            this.finalPolygonArray = polygonArray;
            this.polygonCenter = polygonCenter;
        },
        formatLineData() {
            let lineArray = [];
            this.lineArray.map(item =>{
                lineArray.push({
                    'lng': item[0],
                    'lat': item[1]
                })
            })
            this.finalLineArray = lineArray
        },
        submitLocation() {
            let polygonArray = [];
            let polygonCenter = this.getPolygonCenter(this.polygonArray[0])
            this.polygonArray[0].map(item => polygonArray.push({
                'lng': item[0],
                'lat': item[1]
            })
            )
            this.finalPolygonArray = polygonArray;
            this.polygonCenter = polygonCenter;
        },
        drawPolygon() {
            if (this.polygonArray.length > 0) {
                this.toast.error('شما مجاز به کشیدن تنها یک پلیگون هستید', this.toastOptions)
            } else {
                this.drawShapeOnMap(this)
            }
        },
        drawLine() {
            if (this.lineArray.length > 0) {
                this.toast.error('شما مجاز به کشیدن تنها یک ردیف هستید', this.toastOptions)
            } else {
                this.drawLineOnMap(this)
            }
        },
        deletePolygon() {
            if (this.polygonArray.length > 0) {
                this.deleteShapeOnMap(this, 'polygon')
            } else {
                this.toast.error('ابتدا پلیگون خود را رسم کنید', this.toastOptions)
            }
        },
        deleteLine() {
            if (this.lineArray.length > 0) {
                this.mapLineForm = false;
            
                this.deleteShapeOnMap(this, 'line')
            } else {
                this.toast.error('ابتدا ردیف  خود را رسم کنید', this.toastOptions)
            }
        },
        modifyShap(id, type) {
            this.modifyShapeOnMap(this, id, type)
        },
        getPolygonCenter(array) {
            let polygonGeoArray = [];
            let polygonCenter = null;
            array.map(item => polygonGeoArray.push({
                latitude: item[1],
                longitude: item[0]
            }))
            polygonCenter = {
                'lng': getCenter(polygonGeoArray)['longitude'],
                'lat': getCenter(polygonGeoArray)['latitude'],
            }
            return polygonCenter;
        },
        showAnalysisPolygon(coordinate, center, isPlant) {
            this.drawSingleFeature(coordinate, center, isPlant);
        },
        showCreatedFarm(coordinate, center, isPlant, id, editColor, editCenetr) {
            this.drawFeature(coordinate, center, isPlant, id, editColor, editCenetr);
        },
        showCreatedLine(coordinate, id,isLine, editColor, editCenetr) {
            this.drawLineFeature(coordinate, id,isLine, editColor, editCenetr)
        },
        showImage(selected) {
            this.drawImage(selected);
        },
        displayMapAnalysis(url, self, params) {
            console.log(self.map.getLayers().array_);
            if(self.singleService.service_type === 'farm') {
                this.addImageLayerOnMap(url, self, params);
            }else {
            this.addLayer(url, self, params)
            }
        },
        deleteMapLayer(self, layer) {
            this.removeLayer(self, layer)
        },
        showMapPoints(self, layer) {
            this.showPoints(self, layer);
            this.getPointsValue(self, layer)

        },
        clickOnMap(event, farmPolygon) {
            console.log(event)
            console.log(farmPolygon)
            let farmLatLon = [];
            let selfValue = this;
            farmPolygon[0].map(item => {
                let obj = {}
                obj.latitude = item[0]
                obj.longitude = item[1]
                farmLatLon.push(obj)
            })
            let unlisten = [];
            let path = event.path || (event.composedPath && event.composedPath());
            unlisten = path.map(item => item.className === "ol-popup" || item.className === "bg-white systematic_area_analysis_position" || item.className === "systematic_area_analysis_position")
            if (!unlisten.includes(true)) {
                this.map.once("singleclick", function (evt) {
                    let coordinate = evt.coordinate;
                    let value = isPointInPolygon({ latitude: coordinate[0], longitude: coordinate[1] }, farmLatLon)
                    if (!value) {
                        selfValue.deleteShapeOnMap(selfValue)
                    }

                });
            }
        },
        showJalizbanFeatures(coordinate, center, isPlant, id, editColor, editCenetr) {
            this.drawFeature(coordinate, center, isPlant, id, editColor, editCenetr);
        }
    }
}