import json_DocView from "../json/def_DocView.json"
import json_APISPDocView from "../json/api_spDocView.json"

export const DEF_DOCUMENTVIEW = json_APISPDocView;
export const DEF_DOCVIEW = json_DocView;

export const DEF_DOCVIEWEVENTS: IDocViewEvents = {
    IsLoaded: false,
    ReloadAll: () => {} 
}

export interface IDocumentView {
    Header: string;
    Set1:   IDocView[];
    Set2:   IDocView[];
    Set3:   IDocView[];
    Set4:   IDocView[];
    Set5:   IcomboData[];
    Set6:   IcomboData[];
}

export interface IDocView {
    DocumentTrackID: number;
    DocTypeID:       number;
    ControlNumber:   string;
    personName?:     string;
    NoDays:          string;
    Office?:          string;
    DocType:         string;
    Subject:         string;
    picIndex:        number;
}
export interface IcomboData {
    id: number;
    name: string;
    active: string;
    picIndex: number;
  }

export  interface IDocViewEvents {
    IsLoaded?: boolean;
    ReloadAll: ()=> | void;
}

