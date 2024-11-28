import React from 'react';
import { mount } from 'cypress/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs Component', () => {
  it('should render tabs correctly', () => {
    mount(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    cy.get('button').should('have.length', 2);
    cy.get('button').first().should('contain', 'Tab 1');
  });

  it('should switch content on tab click', () => {
    mount(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    cy.get('button').last().click();
    cy.get('div').should('contain', 'Content 2');
  });
});
