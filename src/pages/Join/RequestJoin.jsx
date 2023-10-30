import React, { useState } from "react";
import { Container, Row, Col, Button, Text } from "tailwindcss";
import backgroundImage from "../../assets/background-join.jpeg";

export default function RequestJoin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false); // Initial State : user not joined

  // Check is user join
  const handleJoin = () => {
    // Misalnya, Anda dapat mengirim permintaan ke server untuk memproses permintaan bergabung
    // Kemudian, setelah berhasil bergabung, atur isJoined menjadi true
    setIsJoined(true);
  };

  return (
    <Container>
      <Row>
        <Col xs="12" sm="10" md="8" lg="6" xl="4">
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {isJoined ? ( // User joined
              <>
                <h1 class="text-4xl font-bold text-white">
                  Hold on tight, your Sevenify+ request is being reviewed.
                </h1>
              </>
            ) : ( // User not joined
              <>
                <h1 class="text-4xl font-bold text-white">
                  Share music with us, join Sevenify+
                </h1>
                <p class="text-lg text-white">
                  Sevenify+ is a premium subscription service that gives you access to exclusive features, such as:
                </p>
                <ul class="list-disc text-white">
                  <li>Download music for offline listening</li>
                  <li>Access to ad-free listening</li>
                  <li>Unlimited skips</li>
                  <li>Higher streaming quality</li>
                </ul>
                <Button
                  class="mt-4 btn text-white"
                  disabled={isLoading}
                  onClick={handleJoin}
                >
                  Join Sevenify+
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="10" md="8" lg="6" xl="4">
          <h3 class="text-lg text-white">Why join Sevenify+?</h3>
          <p class="text-white">
            Sevenify+ is the best way to enjoy your music. With ad-free listening, unlimited skips, and higher streaming quality, you can listen to your favorite songs without interruption.
          </p>
        </Col>
      </Row>
    </Container>
  );
}