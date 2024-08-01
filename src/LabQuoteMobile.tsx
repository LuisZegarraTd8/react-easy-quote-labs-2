import * as React from 'react';
import Container from '@mui/material/Container';
import LabCalculator, {LabItem} from "../src/services/lab-calculator";
import {useState} from "react";
import {GridRowSelectionModel} from "@mui/x-data-grid";
import TotalQuote from "../src/TotalQuote";
import BigNumber from "bignumber.js";
import MathUtils from "../src/services/math-utils";
import LabHeader from "../src/LabHeader";
import LabTableMobile from "./LabTableMobile";
import LabMiniSummaryMobile from "./LabMiniSummaryMobile";

export default function LabQuoteMobile() {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [selectedLabs, setSelectedLabs] = useState([] as LabItem[]);
  const total = LabCalculator.getTotalAmount(selectedLabs);
  const suggestedTotal = new BigNumber(MathUtils.roundToNearestHundred(total.toNumber()));
  const deleteSelectedRowSelectionModel = (
      itemToDelete: LabItem,
      selectedRowItems: GridRowSelectionModel = rowSelectionModel,
      setRowSelectionModelState: Function = setRowSelectionModel
  ) => {
      const filtered = selectedRowItems.filter(selectedRowItem => { return Number(selectedRowItem) !== itemToDelete.id });
      setRowSelectionModelState(filtered);
  };

  const deleteSelectedLabItem = (
      itemToDelete: LabItem,
      labItems: LabItem[] = selectedLabs,
      setSelectedLabsState: Function = setSelectedLabs,
  ) => {
    const selectedItemsAfterDelete: LabItem[] = labItems.filter(labItems => {
        return labItems.id !== itemToDelete.id;
    });
    setSelectedLabsState(selectedItemsAfterDelete);
  };
  return (
    <Container maxWidth="xl">
      <LabHeader title={'CEMEVYF: Aug 2024 Final'} subTitle={'Cotizaciones de Laboratorios'} />
      <LabTableMobile
            rowSelectionModel={rowSelectionModel}
            setSelectedLabItems={setSelectedLabs}
            setRowSelectionModel={setRowSelectionModel}/>
      <LabMiniSummaryMobile selectedLabItems = {selectedLabs}
                              deleteSelectedLabItem={deleteSelectedLabItem}
                              deleteSelectedRowSelectionModel={deleteSelectedRowSelectionModel}/>
      <TotalQuote description={'Total Sugerido'} totalQuote={suggestedTotal.toFormat(0)}/>

    </Container>
  );
}
