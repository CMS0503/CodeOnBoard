import { Document, Page, pdfjs } from "react-pdf";
import * as React from "react";
import { Button, Grid } from "tabler-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ProblemViewer(props)  {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return(
        <React.Fragment>
        <Grid.Row justifyContent="center" className="pt-2">
        <Document 
        file={props.desc} 
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
        </Document>
            <Grid.Row className="pt-2">
                <Grid.Col >
                    <Button color="priamry" disabled={pageNumber <=1} onClick={() => setPageNumber(prevPageNumber => prevPageNumber-1)}>이전</Button>
                </Grid.Col>
                <Grid.Col className="pt-2" auto={true}>
                    <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>
                </Grid.Col>
                <Grid.Col>
                    <Button color="priamry" disabled={pageNumber >=numPages} onClick={() => setPageNumber(prevPageNumber => prevPageNumber+1)}>다음</Button>
                </Grid.Col>
            </Grid.Row>
        </Grid.Row>
        </React.Fragment>   
    )
}

export default ProblemViewer;