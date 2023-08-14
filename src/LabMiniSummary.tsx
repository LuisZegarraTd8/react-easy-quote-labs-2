import {IconButton, Paper, TableCell, TableHead, TableRow} from "@mui/material";
import React, {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableVirtuoso } from 'react-virtuoso';
import DeleteIcon from '@mui/icons-material/Delete';
import LabCalculator, {LabItem} from "./services/lab-calculator";
import TotalQuote from "./TotalQuote";
import BigNumber from "bignumber.js";
import MathUtils from "./services/math-utils";

const TableComponents = {
    Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
    Table: props => <Table {...props} style={{ borderCollapse: 'separate' }} />,
    TableHead: TableHead,
    TableRow: TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
}

export default function LabMiniSummary({selectedLabItems}) {
    const total = LabCalculator.getTotalAmount(selectedLabItems);
    const suggestedTotal = new BigNumber(MathUtils.roundToNearestHundred(total.toNumber()));
    return (
    <>
        <TableVirtuoso
            style={{ height: 400 }}
            data={selectedLabItems || []}
            components={TableComponents}
            fixedHeaderContent={() => (
                <TableRow>
                    <TableCell style={{ width: 90, background: 'white' }}>
                        Abreviatura
                    </TableCell>
                    <TableCell style={{ background: 'white' }}>
                        Estudio de Laboratorio
                    </TableCell>
                    <TableCell style={{ width: 90, background: 'white' }}>
                        Eliminar
                    </TableCell>
                </TableRow>
            )}
            itemContent={(index, selectedLabItem) => (
                <>
                    <TableCell style={{ width: 90, background: 'white' }}>
                        {selectedLabItem.code}
                    </TableCell>
                    <TableCell style={{ background: 'white'  }}>
                        {selectedLabItem.name}
                    </TableCell>
                    <TableCell style={{ width: 90, background: 'white' }}>
                        <IconButton
                            onClick={() => {
                                console.log('Selected');
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </>
            )}
        />
        <TotalQuote description={"Total Sugerido"} totalQuote={suggestedTotal.toFormat(0)}/>
    </>
    )
}
