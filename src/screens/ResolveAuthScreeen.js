import React , {useEffect,useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Context as AuthContext} from '../context/AuthContext'
const ResolveAuthScreeen = () => {
    const {tryLocalLogin} = useContext(AuthContext)

    useEffect(() => {
        tryLocalLogin()
    }, [])
    return null
}

export default ResolveAuthScreeen

const styles = StyleSheet.create({})
