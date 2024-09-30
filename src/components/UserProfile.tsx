import React, { useState, useEffect } from 'react';
import { User } from '@/lib/validators/profileValidator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user-profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError('An error occurred while fetching the user profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert>
        <AlertTitle>No User Found</AlertTitle>
        <AlertDescription>Unable to retrieve user profile information.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>User Profile</CardHeader>
      <CardContent>
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Username:</strong> {user.username || 'N/A'}</p>
        {user.image && <img src={user.image} alt="Profile" style={{width: '100px', height: '100px'}} />}
      </CardContent>
    </Card>
  );
};

export default UserProfile;