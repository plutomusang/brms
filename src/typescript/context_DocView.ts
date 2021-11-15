import { createContext } from "react";
import {DEF_DOCVIEW,IDocView,IDocumentView,DEF_DOCUMENTVIEW } from "./interface_DocView"


const DocViewContext = createContext<IDocumentView>(DEF_DOCUMENTVIEW);

export default DocViewContext;

