import { useRouter } from 'next/router';
import React, { useEffect, useState} from 'react'
import { useAccount, useSendTransaction } from 'wagmi'

export default function Dashboard() {
    const [to, setTo] = useState('')
    const [value, setValue] = useState('')

    const { isConnected } = useAccount();
    const router = useRouter();
    const { sendTransaction } = useSendTransaction({
        request: {
            to,
            value: (value * 1e18).toString(),
        },
        onSuccess: () => alert('Transaction created successfully'),
    })

    useEffect(() => {
        if(!isConnected) {
            router.replace('/')
        }
    }, [isConnected])

    return (
        <div>
            <div>
                To:{' '}
                <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div>
                Value:{' '}
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <button onClick={sendTransaction}>Send</button>
        </div>
    )
}