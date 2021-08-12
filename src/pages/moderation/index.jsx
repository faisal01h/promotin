import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../auth'

const Moderation = () => {

    const [Elevation, setElevation] = useState('user'); // User default elevation, change to real user elevation on useEffect

    useEffect(() => {
        // Elevation check

        // axios.post()
        // then setElevation()
    }, [])

    function banUser(userId, message) {
        // Permission: Admin
    }

    function reportUserToAdmin(userId, message) {
        // Permission: Moderator, Admin
    }

    function removePost(itemId, message) {
        // Permission: Moderator, Admin
    }

    function viewReportedUsers() {
        // Permission: Admin
    }

    function viewAllAdmins() {
        // Permission: *
    }

    function viewAllModerators() {
        // Permission: *
    }

    function viewAllInsiders() {
        // Permission: Insider, Moderator, Admin
    }

    function viewAllUsers() {
        // Permission: *
    }

    function changeRole(userId, newRole, message) {
        // Permission: Admin
    }

    function removeComment(commentId, message) {
        // Permission: Moderator, Admin
    }

    function viewInsiderFeedback(userId) {
        // Permission: Admin
    }

    function submitFeedback(userId, message, feedbackType) {
        // Permission: Insider, Moderator, Admin
    }

    return (
        <div>

        </div>
    )
}

export default Moderation;