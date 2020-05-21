import React, {Component} from 'react';
import Chart from 'chart.js';
import DownloadNShare from './shareFile';
import XmlViewer from './xmlViewer';
const axios = require('axios');


export default class CompareCTData extends Component{
    constructor(props){
        super(props);
        this.state = {CTData: this.props.CTData, fileContent: null, fileName: "Parameters.xml", graphData: null, extra: false, more: null};
        this.sorta = this.sorta.bind(this);
        this.sortb = this.sortb.bind(this);
        this.createCTfile = this.createCTfile.bind(this);
        this.removeCT = this.removeCT.bind(this);
        this.CreateGraph = this.CreateGraph.bind(this);
        this.sortA = null;
        this.sortB = null;
        this.toggleMore = this.toggleMore.bind(this);
        this.selectCt = this.selectCt.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.CTData !== prevProps.CTData) {
          this.setState({CTData: this.props.CTData, fileContent: null})
        }
    }

    sorta(){
        const data = this.state.CTData;
        if(this.sortA){
            data.root.sort((a, b) => {
                return(b.ct.GainPoly[0].a[0] - a.ct.GainPoly[0].a[0]);
            })
            this.sortA = false;
        } else {
            data.root.sort((a, b) => {
                return(a.ct.GainPoly[0].a[0] - b.ct.GainPoly[0].a[0]);
            })
            this.sortA = true;
        }
        
        this.setState({CTData: JSON.parse(JSON.stringify(data))});
    }

    sortb(){
        const data = this.state.CTData;
        if(this.sortB){
            data.root.sort((a, b) => {
                return(b.ct.GainPoly[0].b[0] - a.ct.GainPoly[0].b[0]);
            })
            this.sortB = false;
        } else {
            data.root.sort((a, b) => {
                return(a.ct.GainPoly[0].b[0] - b.ct.GainPoly[0].b[0]);
            })
            this.sortB = true;
        }
        
        this.setState({CTData: JSON.parse(JSON.stringify(data))});
    }

    toggleMore(){
        
        this.setState(function (state) {
            return {more: !state.more }
        })
    }
    
    selectCt(event){
        // console.log(event.target.checked);
        const name = event.target.name;
        const cts = this.state.CTData;
        // console.log(cts.root[0].ct.$.sn);
        const idx = cts.root.findIndex(ct => ct.ct.$.sn === name);
        // console.log(idx);
        cts.root[idx].ct.seleted = event.target.checked;
        this.setState({CTData: cts});
    }

    getTabularData() {  
        const data = this.state.CTData;
        if(data){
            const rows = data.root.map((ct) => {
                if( ct.ct){
                    return(
                        <tr key={ct.ct.$.sn} className={ct.ct.seleted ? "table-dark selected": ""}>
                            
                            <td >    
                                <label className="Mpointer"><input type="checkbox" name={ct.ct.$.sn} onClick={this.selectCt} /> &nbsp; <u>{ct.ct.$.sn}  ({ct.ct.model[0]})</u></label> 
                            </td>
                            <td className="text-right ">{parseFloat(ct.ct.GainPoly[0].a).toFixed(4)}</td>
                            <td className="text-right ">{parseFloat(ct.ct.GainPoly[0].b).toFixed(4)}</td>
                            {this.state.more && <td className="text-right ">{parseFloat(ct.ct.GainPoly[0].c).toFixed(4)}</td>}
                            {this.state.more && <td className="text-right ">{parseFloat(ct.ct.GainPoly[0].d).toFixed(4)}</td>}
                            
                            <td className="text-right ">{parseFloat(ct.ct.PhasePoly[0].a).toFixed(4)}</td>
                            <td className="text-right ">{parseFloat(ct.ct.PhasePoly[0].b).toFixed(4)}</td>
                            {this.state.more && <td className="text-right ">{parseFloat(ct.ct.PhasePoly[0].c).toFixed(4)}</td>}
                            {this.state.more && <td className="text-right ">{parseFloat(ct.ct.PhasePoly[0].d).toFixed(4)}</td>}
                        </tr>
                    );
                } else {
                    return(<tr></tr>);
                }
            })
            
        
            return(
                <div className="container-fluid">
                    <hr />
                    <div className="row" >
                        <div className="col-md-4">
                        <div id="graphBanner">
                            <h3>Please select CT's to create graphs. </h3>
                            <img src="../logo/graph.png" alt="graph"></img>
                        </div>
                            <div className="graphArea" id="graphArea">
                                
                            <div className="graph gainGraph" >
                                <h5>Y Gain Error</h5>
                                <canvas id="gainGraph"></canvas>
                            </div>
                            <hr/>
                            <div className="graph phaseGraph" >
                                <h5>Y Phase Error</h5>
                                <canvas id="phaseGraph"></canvas>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            
                            <button className="btn btn-sm btn-link float-right" onClick={this.createCTfile}>Create CT file</button>
                            <button className="btn btn-sm btn-link float-right" onClick={this.removeCT}>Remove CT</button>
                            <button className="btn btn-sm btn-link float-right" onClick={this.CreateGraph}>Create Graph</button>
                            <table className="table table-bordered table-dark compareTable">
                                <thead className="">
                                    <tr>
                                        <th colSpan={this.state.more ? "9" : "5"} className="bg-info text-center">
                                            CT Files
                                            <span className="float-right" ><button className="btn btn-sm btn-info" onClick={this.toggleMore}><u>{this.state.more ? "Show Less" : "Show Details"}</u></button></span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th colSpan={this.state.more ? "4" : "2"} className="text-center">Gain</th>
                                        <th colSpan={this.state.more ? "4" : "2"} className="text-center">Phase </th>
                                    </tr>
                                    <tr>
                                        
                                        <th ># CT's  (Model)</th>
                                        <th className="text-center">
                                            <button className="btn btn-sm btn-info btn-block" onClick={this.sorta}>
                                                A <img className="float-right" src="../logo/sort.svg" alt="sorting" height="17px"/>
                                            </button>
                                        </th>
                                        <th className="text-center">
                                            <button className="btn btn-sm btn-info btn-block" onClick={this.sortb}>
                                                B <img className="float-right" src="../logo/sort.svg" alt="sorting" height="17px"/>
                                            </button>
                                        </th>
                                        {this.state.more && <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>C</button></th>}
                                        {this.state.more && <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>D</button></th>}
                                        <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>A</button></th>
                                        <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>B</button></th>
                                        {this.state.more && <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>C</button></th>}
                                        {this.state.more && <th className="text-center"><button className="btn btn-sm btn-secondary btn-block" disabled>D </button></th>}
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }

    removeCT(){
        const data = this.state.CTData;
        console.log(data)
        const newData = data.root.filter((f) => {
            return(f.ct.seleted !== true);
        });
        this.setState({CTData: {root: newData}});
    }

    createCTfile(){
        const data = this.state.CTData;        
        const selectedFiles = data.root.filter((f) => {
            return(f.ct.seleted === true);
            
        });
        const combinedFile = {root: []}
        combinedFile.root = selectedFiles; 
        const request = {
            url: '/api/createXML',
            method: 'POST',
            data: combinedFile
        }
        axios(request).then((result) => {
            console.log(result);
            this.setState({fileContent: result.data, CTData: null});
        }).catch((err) => {
            console.log(err);
        })  
    }
    ShareFileComponent(){
        const fileContent = this.state.fileContent;
        if(fileContent){
            return(<DownloadNShare fileName={this.state.fileName} fileData={fileContent} uploadTypeProject={false}/>);
        }
    }

    createDataset(){
        const borderColor = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(126, 154, 25, 1)',
            'rgba(25, 124, 154, 1)',
            'rgba(167, 27, 27, 1)',
            'rgba(64, 25, 154, 1)'
        ];
        const xAxis = [-4, -3, -2, -1, 0, 1, 2, 3];
        const finalData = {
            phase: {labels: xAxis, datasets: []},
            gain: {labels: xAxis, datasets: []}
        };
        const selectedData = this.state.CTData.root.filter((f) => {
            return(f.ct.seleted === true);
        });
        // y = a + b*x + c*x^2 + d*x^3
        let count = 0;
        selectedData.forEach(element => {
            let gain_a = parseFloat(element.ct.GainPoly[0].a[0]);
            let gain_b = parseFloat(element.ct.GainPoly[0].b[0]);
            let gain_c = parseFloat(element.ct.GainPoly[0].c[0]);
            let gain_d = parseFloat(element.ct.GainPoly[0].d[0]);
            let phase_a = parseFloat(element.ct.PhasePoly[0].a[0]);
            let phase_b = parseFloat(element.ct.PhasePoly[0].b[0]);
            let phase_c = parseFloat(element.ct.PhasePoly[0].c[0]);
            let phase_d = parseFloat(element.ct.PhasePoly[0].d[0]);
            const gain_yAxis = [];
            const phase_yAxis = [];
            xAxis.forEach((x) => {
                let gain_y = gain_a + gain_b * x + gain_c * Math.pow(x, 2) + gain_d * Math.pow(x, 3);
                let phase_y = phase_a + phase_b * x + phase_c * Math.pow(x, 2) + phase_d * Math.pow(x, 3);
                gain_yAxis.push(gain_y);
                phase_yAxis.push(phase_y);
            });
            if(count > 9){
                count = 0;
            }
            finalData.gain.datasets.push({label: element.ct.$.sn, data: gain_yAxis, borderColor: borderColor[count], fill: false });
            finalData.phase.datasets.push({label: element.ct.$.sn, data: phase_yAxis, borderColor: borderColor[count], fill: false})
            count++;
        });
        
        console.log(finalData);
        return(finalData);
    }


    CreateGraph(){
        const graphArea = document.querySelector('.graphArea');
        const graphBanner = document.querySelector('#graphBanner');
        graphBanner.style.display = "none";
        graphArea.style.display = "block";

        const graphData = this.createDataset();
        const gain_ctx = document.getElementById('gainGraph').getContext('2d');
        const phase_ctx = document.getElementById('phaseGraph').getContext('2d');
        if(window.gain !== undefined){
            window.gain.destroy();
        }
        window.gain = new Chart(gain_ctx, {
			type: 'line',
            data: graphData.gain,
            // Configuration options go here
            options: {
                tooltips: {
                    enabled: true
                }
            } 
        });

        if(window.phase !== undefined){
            window.phase.destroy();
        }
        window.phase = new Chart(phase_ctx, {
			type: 'line',
            data: graphData.phase,
            // Configuration options go here
            options: {
                tooltips: {
                    enabled: true
                }
            } 
        });
    }
 

    render(){
        const fileContent = this.state.fileContent;
        return(
            <div>
                {this.ShareFileComponent()}
                {this.getTabularData()}
                <XmlViewer fileContent={fileContent} fileName={this.state.fileName}/>     
            </div>
        );
    }
} 