import React from 'react';
import { Button, Space, Divider } from 'oss-ui';

class Default extends React.Component {
    render() {
        return (
            <>
                <Divider />
                <Space>
                    <Button
                        onClick={() => {
                            this.props.history.push('/demo');
                        }}
                    >
                        demo
                    </Button>
                </Space>
                <Divider />
            </>
        );
    }
}
export default Default;
