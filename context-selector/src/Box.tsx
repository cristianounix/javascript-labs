
export const Box = (props: any) => (
  <div>
    <div style={{ float: 'left', width: '40%', marginTop: '100px', minHeight:'100px' , border: '1px solid green',  backgroundColor: '#d6d0d6' }}>
      {props.children}
    </div>
  </div>
);